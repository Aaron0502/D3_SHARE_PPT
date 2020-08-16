import React from "react";
import Demo1 from "../demo/demo1";
import Demo2 from '../demo/demo2'

const code_d3 = `import { width, height, margin, generateScale, colorMap } from "./data";

const d3 = require("d3");

const svg = d3
  .create("svg")
  .attr("viewBox", [0, 0, width, height])
  .attr("width", width + margin.left)
  .attr("height", height + margin.top + margin.bottom);

function createStackChart(el, data) {
  const { series, xScale, yScale } = generateScale(data);

  const bandwidth = xScale.bandwidth();

  svg
    .selectAll("g")
    .data(series, (d) => {
      return d.key;
    })
    .join(
      (enter) =>
        enter
          .append("g")
          .attr("fill", (d) => colorMap[d.key])
          .selectAll("rect")
          .data((d) => d)
          .enter()
          .append("rect")
          .attr("width", bandwidth)
          .attr("x", (d) => xScale(d.data.category) - bandwidth / 2)
          .attr("y", (d) => yScale(d[1]))
          .attr("height", (d) => yScale(d[0]) - yScale(d[1])),
      (update) =>
        update
          .attr("fill", (d) => colorMap[d.key])
          .selectAll("rect")
          .data((d) => d)
          .transition()
          .duration(500)
          .attr("y", (d) => yScale(d[1]))
          .attr("height", (d) => yScale(d[0]) - yScale(d[1])),
      (exit) => {
        exit
          .selectAll("rect")
          .data((d) => d)
          .transition()
          .duration(500)
          .attr("width", 0);
        // .attr("height", 0);
        exit.transition().duration(500).remove();
      }
    );

  const child = el.firstElementChild;
  if (!child) {
    el.appendChild(svg.node());
  }
}

export default createStackChart;
`

const code_jsx = `import React from "react";
import { width, height, margin, generateScale, colorMap } from "./data";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./StackChart.css";

const marginWidth = width + margin.left;
const marginHeight = height + margin.top + margin.bottom;

function StackChartTransition(props: StackChartTransitionProps) {
  const { data } = props;
  const { series, xScale, yScale } = generateScale(data);
  const bandwidth = xScale.bandwidth();
  return (
    <svg
      width={marginWidth}
      height={marginHeight}
      viewBox={\`\${[0, 0, width, height]}\`}
    >
      <TransitionGroup component={null}>
        {series.map((gItem) => (
          <CSSTransition key={gItem.key} timeout={500} classNames="g">
            <g fill={colorMap[gItem.key]}>
              {gItem.map((rectItem) => (
                <rect
                  className="stack-chart"
                  key={rectItem.data.category}
                  x={xScale(rectItem.data.category) - bandwidth / 2}
                  y={yScale(rectItem[1])}
                  width={bandwidth}
                  height={yScale(rectItem[0]) - yScale(rectItem[1])}
                ></rect>
              ))}
            </g>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </svg>
  );
}

export default StackChartTransition;
`

export default function Topic() {
  return (
    <section>
      <section>
        {/* <Demo1 /> */}
        <Demo2 />
      </section>
      <section data-auto-animate>
        <pre data-id="code">
          <code data-line-numbers className="hljs" data-trim>
            {code_d3}
          </code>
        </pre>
      </section>
      <section data-auto-animate>
        <pre data-id="code">
          <code data-line-numbers className="hljs" data-trim>
            {code_jsx}
          </code>
        </pre>
      </section>
    </section>
  );
}
