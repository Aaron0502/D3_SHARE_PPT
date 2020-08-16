import React from "react";
import { x, y, n, duration, prev, next } from "../data";
import { Transition, TransitionGroup } from "react-transition-group";

const bandwidth = y.bandwidth();

function getTransitionStyles(state, d) {
  switch (state) {
    case "entering":
      return {
        transform: `translate(${x((prev.get(d) || d).value)},${y(
          (prev.get(d) || d).rank
        )})`,
      };
    case "exited":
      return {
        transform: `translate(${x((next.get(d) || d).value)},${y(
          (next.get(d) || d).rank
        )})`,
      };
    default:
      return {};
  }
}

export default function Label(props) {
  const { data } = props;
  return (
    <TransitionGroup
      component="g"
      fontSize={12}
      fill="#eee"
      textAnchor="end"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {data[1].slice(0, n).map((d) => (
        <Transition key={d.name} timeout={duration}>
          {(state) => {
            console.log("hehe", getTransitionStyles(state, d));
            return (
              <text
                className="text"
                height={bandwidth}
                x="-6"
                y={bandwidth / 2}
                dy="-0.25em"
                transform={
                  getTransitionStyles(state, d).transform ||
                  `translate(${x(d.value)},${y(d.rank)})`
                }
              >
                <tspan>{d.name}</tspan>
                <tspan fillOpacity="0.7" fontWeight="normal" x="-6" dy="1.15em">
                  {d.value}
                </tspan>
              </text>
            );
          }}
        </Transition>
      ))}
    </TransitionGroup>
  );
}
