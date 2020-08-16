import React from "react";
// import Demo1 from "../demo/demo1";
import Demo2 from "../demo/demo2";
import { width } from "../demo/demo1/data";

const data = `
  [
    [
      "2000-01-01T00:00:00.000Z",
      [
        {"name":"Coca-Cola","value":72537,"rank":0},
        {"name":"Microsoft","value":70196,"rank":1},
        ...
      ]
    ],
    [
      "2000-02-01T00:00:00.000Z",
      [
        {"name":"Coca-Cola","value":72177.8,"rank":0},
        {"name":"Microsoft","value":69683.2,"rank":1},
        ...
      ]
    ],
    ...
  ]
`;

const data_handle = `
import data from "./dataSource";

export const n = 12;
export const barSize = 35;
export const duration = 250;
export const margin = { top: 16, right: 6, bottom: 6, left: 0 };
export const width = 750;
export const height = margin.top + barSize * n + margin.bottom;

export const formatDate = function (date) {
  return date.slice(0, 4);
};
const formatNumber = window.d3.format(",d");

export const y = window.d3
  .scaleBand()
  .domain(window.d3.range(n + 1))
  .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
  .padding(0.1);

export const x = window.d3.scaleLinear(
  [0, 1],
  [margin.left, width - margin.right]
);

const scale = window.d3.scaleOrdinal(window.d3.schemeTableau10);
export const color = function (d) {
  return scale(d.name);
};

const nameframes = window.d3.groups(
  data.flatMap(([, data]) => data),
  (d) => d.name
);
export const next = new Map(
  nameframes.flatMap(([, data]) => window.d3.pairs(data))
);
export const prev = new Map(
  nameframes.flatMap(([, data]) => window.d3.pairs(data, (a, b) => [b, a]))
);

export function textTween(a, b) {
  const i = window.d3.interpolateNumber(a, b);
  return function (t) {
    this.textContent = formatNumber(i(t));
  };
}
`;

const data_handle_simple = `
...

// y轴坐标信息
export const y = window.d3
  .scaleBand()
  .domain(window.d3.range(n + 1))
  .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
  .padding(0.1);

// x轴坐标信息
export const x = window.d3.scaleLinear(
  [0, 1],
  [margin.left, width - margin.right]
);

...
`;

const code_d3 = `
import {
  width,
  height,
  barSize,
  margin,
  n,
  y,
  formatDate,
  color,
  prev,
  next,
  textTween,
  x,
  duration,
} from "./data";
import data from "./dataSource";

function axis(svg) {
  const g = svg.append("g").attr("transform", \`translate(0,\${margin.top})\`);

  const axis = window.d3
    .axisTop(x)
    .ticks(width / 160)
    .tickSizeOuter(0)
    .tickSizeInner(-barSize * (n + y.padding()));

  return (_, transition) => {
    g.transition(transition).call(axis);
    g.select(".tick:first-of-type text").remove();
    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
    g.select(".domain").remove();
  };
}

function ticker(svg) {
  const now = svg
    .append("text")
    .style("font-variant-numeric", "tabular-nums")
    .attr("text-anchor", "end")
    .attr("x", width - 6)
    .attr("y", margin.top + barSize * (n - 0.45))
    .attr("dy", "0.32em")
    .attr("fill", "#fff")
    .text(formatDate(data[0][0]));

  return ([date], transition) => {
    transition.end().then(() => now.text(formatDate(date)));
  };
}

function labels(svg) {
  let label = svg
    .append("g")
    .attr('font-size', 12)
    .attr('fill', '#eee')
    .style("font-variant-numeric", "tabular-nums")
    .attr("text-anchor", "end")
    .selectAll("text");

  return ([date, data], transition) =>
    (label = label
      .data(data.slice(0, n), (d) => d.name)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr(
              "transform",
              (d) =>
                \`translate(\${x((prev.get(d) || d).value)},\${y(
                  (prev.get(d) || d).rank
                )})\`
            )
            .attr("y", y.bandwidth() / 2)
            .attr("x", -6)
            .attr("dy", "-0.25em")
            .text((d) => d.name)
            .call((text) =>
              text
                .append("tspan")
                .attr("fill-opacity", 0.7)
                .attr("font-weight", "normal")
                .attr("x", -6)
                .attr("dy", "1.15em")
            ),
        (update) => update,
        (exit) =>
          exit
            .transition(transition)
            .remove()
            .attr(
              "transform",
              (d) =>
                \`translate(\${x((next.get(d) || d).value)},\${y(
                  (next.get(d) || d).rank
                )})\`
            )
            .call((g) =>
              g
                .select("tspan")
                .tween("text", (d) =>
                  textTween(d.value, (next.get(d) || d).value)
                )
            )
      )
      .call((bar) =>
        bar
          .transition(transition)
          .attr("transform", (d) => \`translate(\${x(d.value)},\${y(d.rank)})\`)
          .call((g) =>
            g
              .select("tspan")
              .tween("text", (d) =>
                textTween((prev.get(d) || d).value, d.value)
              )
          )
      ));
}

function bars(svg) {
  let bar = svg.append("g").attr("fill-opacity", 0.6).selectAll("rect");

  return ([date, data], transition) =>
    (bar = bar
      .data(data.slice(0, n), (d) => d.name)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("fill", color)
            .attr("height", y.bandwidth())
            .attr("x", x(0))
            .attr("y", (d) => y((prev.get(d) || d).rank))
            .attr("width", (d) => x((prev.get(d) || d).value) - x(0)),
        (update) => update,
        (exit) =>
          exit
            .transition(transition)
            .remove()
            .attr("y", (d) => y((next.get(d) || d).rank))
            .attr("width", (d) => x((next.get(d) || d).value) - x(0))
      )
      .call((bar) =>
        bar
          .transition(transition)
          .attr("y", (d) => y(d.rank))
          .attr("width", (d) => x(d.value) - x(0))
      ));
}

export default function createBarRace(el) {
  const svg = window.d3.create("svg").attr("viewBox", [0, 0, width, height]);

  const updateBars = bars(svg);
  const updateAxis = axis(svg);
  const updateLabels = labels(svg);
  const updateTicker = ticker(svg);

  el.appendChild(svg.node());

  async function replay() {
    for (const keyframe of data) {
      const transition = svg
        .transition()
        .duration(duration)
        .ease(window.d3.easeLinear);

      x.domain([0, keyframe[1][0].value]);

      updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      updateLabels(keyframe, transition);
      updateTicker(keyframe, transition);
      await transition.end();
    }
  }

  replay()

  return replay
}
`;

const code_d3_simple = `
...
export default function createBarRace(el) {
  const svg = window.d3.create("svg").attr("viewBox", [0, 0, width, height]);
  // 创建图形元素
  const updateBars = bars(svg);
  const updateAxis = axis(svg);
  const updateLabels = labels(svg);
  const updateTicker = ticker(svg);

  el.appendChild(svg.node());
  // 切换更新图形元素
  async function replay() {
    for (const keyframe of data) {
      ...
      updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      updateLabels(keyframe, transition);
      updateTicker(keyframe, transition);
      await transition.end();
    }
  }

  replay()

  return replay
}
`;

const bars = `
function bars(svg) {
  let bar = svg.append("g").attr("fill-opacity", 0.6).selectAll("rect");

  return ([date, data], transition) =>
    (bar = bar
      .data(data.slice(0, n), (d) => d.name)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("fill", color)
            .attr("height", y.bandwidth())
            .attr("x", x(0))
            .attr("y", (d) => y((prev.get(d) || d).rank))
            .attr("width", (d) => x((prev.get(d) || d).value) - x(0)),
        (update) => update,
        (exit) =>
          exit
            .transition(transition)
            .remove()
            .attr("y", (d) => y((next.get(d) || d).rank))
            .attr("width", (d) => x((next.get(d) || d).value) - x(0))
      )
      .call((bar) =>
        bar
          .transition(transition)
          .attr("y", (d) => y(d.rank))
          .attr("width", (d) => x(d.value) - x(0))
      ));
}
`;

const code_jsx = `
import React, { useEffect, useState, useRef } from "react";
import Bar from "./Bar";
import Label from "./Label";
import Ticker from "./Ticker";
import Axis from './Axis'
import { width, height, x, duration } from "../data";
import data from "../dataSource";
import "./index.scss";

function sleep(delay = 0) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export default function BarRace() {
  const [barData, setBarData] = useState();
  const replayRef = useRef(null);

  useEffect(() => {
    async function replay() {
      for (const keyframe of data) {
        x.domain([0, keyframe[1][0].value]);
        setBarData(keyframe);
        await sleep(duration);
      }
    }
    replay();
    replayRef.current = replay;
  }, []);
  return (
    <div>
      <button onClick={() => replayRef.current?.()}>replay</button>
      <svg viewBox={[0, 0, width, height]} className="bar-race-container">
        {barData && (
          <>
            <Bar data={barData} />
            <Label data={barData} />
            <Ticker data={barData} />
            <Axis data={barData}/>
          </>
        )}
      </svg>
    </div>
  );
}
`;

const code_jsx_simple = `
...
  return(
    ...
    <svg viewBox={[0, 0, width, height]} className="bar-race-container">
      {barData && (
        <>
          <Bar data={barData} />
          <Label data={barData} />
          <Ticker data={barData} />
          <Axis data={barData}/>
        </>
      )}
    </svg>
    ...
  )
...
`;

const bar_jsx = `
import React from "react";
import { x, y, color, n, duration, prev, next } from "../data";
import { Transition, TransitionGroup } from "react-transition-group";

const bandwidth = y.bandwidth();

function getTransitionStyles(state, d) {
  switch (state) {
    case "entering":
      return {
        y: y((prev.get(d) || d).rank),
        width: x((prev.get(d) || d).value) - x(0),
      };
    case "exited":
      return {
        y: y((next.get(d) || d).rank),
        width: x((next.get(d) || d).value) - x(0),
      };
    default:
      return {};
  }
}

export default function Bar(props) {
  const { data } = props;
  return (
    <TransitionGroup fillOpacity={0.6} component="g">
      {data[1].slice(0, n).map((d) => (
        <Transition key={d.name} timeout={duration}>
          {(state) => (
            <rect
              className="rect"
              fill={color(d)}
              height={bandwidth}
              x={x(0)}
              y={getTransitionStyles(state, d).y || y(d.rank)}
              width={getTransitionStyles(state, d).width || x(d.value) - x(0)}
            ></rect>
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );
}
`;

const bar_jsx_simple = `
...
  return (
    ...
    <TransitionGroup fillOpacity={0.6} component="g">
      {data[1].slice(0, n).map((d) => (
        <Transition key={d.name} timeout={duration}>
          {(state) => (
            <rect
              className="rect"
              fill={color(d)}
              height={bandwidth}
              x={x(0)}
              y={getTransitionStyles(state, d).y || y(d.rank)}
              width={getTransitionStyles(state, d).width || x(d.value) - x(0)}
            ></rect>
          )}
        </Transition>
      ))}
    </TransitionGroup>
    ...
  )
...
`;

function CodeDisplay(props) {
  const { title, code, children } = props;
  return (
    <section data-auto-animate>
      <div data-id="origin-data">{title}</div>
      <pre data-id="code">
        <code data-line-numbers className="hljs" data-trim>
          {code}
        </code>
      </pre>
      {children}
    </section>
  );
}

export default function Demo() {
  return (
    <section>
      <section>
        {/* <Demo1 /> */}
        <Demo2 />
      </section>
      <CodeDisplay code={data} title="原始数据" />
      <CodeDisplay code={data_handle} title="数据处理" />
      <CodeDisplay code={data_handle_simple} title="数据处理" />
      <CodeDisplay code={data_handle_simple} title="数据处理" />
      <CodeDisplay code={code_d3} title="绘制图形" />
      <CodeDisplay code={code_d3_simple} title="绘制图形" />
      <CodeDisplay code={bars} title="bars" />
      <section>
        <h3>可以使用React或者Vue来做吗？</h3>
      </section>
      <section>
        <h3>也许，可以试一试</h3>
      </section>
      <CodeDisplay code={data_handle_simple} title="数据处理" />
      <CodeDisplay code={code_jsx} title="绘制图形" />
      <CodeDisplay code={code_jsx_simple} title="绘制图形" />
      <section>
        <img width="500px" src="../join.png" alt="" />
        <ul>
          <li>Update可以使用react更新视图加css3动画模拟</li>
          <li>Enter、Exit ？</li>
        </ul>
      </section>
      <section>
        <div>React Transition Group</div>
        <ul>
          <li>entering</li>
          <li>entered</li>
          <li>exiting</li>
          <li>exited</li>
        </ul>
      </section>
      <CodeDisplay code={bar_jsx} title="bars" />
      <CodeDisplay code={bar_jsx_simple} title="bars" />
      <section>
        <h4>结论</h4>
        <ul>
          <li>数据处理，完成原始数据到图形属性的映射(可通用)</li>
          <li>绘制图形部分，虽略有不同，但思想是相同的</li>
        </ul>
      </section>
      <section>
        <h3>Think more</h3>
      </section>
      <section>
        <div>Vugel</div>
        <ul>
          <li>Vugel is a WebGL-powered 2d renderer for Vue 3</li>
          <li>Typical use cases for Vugel include games and charts</li>
          <li>
            Based on the tree2d library, which is a high-performance WebGL UI
            library.
          </li>
        </ul>
      </section>
      <section>
        <div
          style={{
            width: "100%",
            height: 800,
            position: "absolute",
            left: 0,
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            title="vugel-demo"
            src="https://vugel-example.planning.nl/"
            frameBorder="0"
          ></iframe>
        </div>
      </section>
    </section>
  );
}
