import React from "react";
import { x, y, color, n, duration } from "../data";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const bandwidth = y.bandwidth();

export default function Bar(props) {
  const { data } = props;
  return (
    <TransitionGroup fillOpacity={0.6} component="g">
      {data[1].slice(0, n).map((d) => (
        <CSSTransition
          key={d.name}
          timeout={duration}
          classNames="rect-transition"
        >
          <rect
            style={{"--color": "#cd0000"}}
            className="rect"
            fill={color(d)}
            height={bandwidth}
            x={x(0)}
            y={y(d.rank)}
            width={x(d.value) - x(0)}
          ></rect>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
