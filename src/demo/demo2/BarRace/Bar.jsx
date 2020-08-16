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
