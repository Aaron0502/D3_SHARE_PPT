import React from "react";
import { x, y, n } from "../data";

const bandwidth = y.bandwidth();

export default function Label(props) {
  const { data } = props;
  return (
    <g
      fontSize={12}
      fill="#eee"
      textAnchor="end"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {" "}
      {data[1].slice(0, n).map((d) => (
        <text
          className="rect"
          key={d.name}
          height={bandwidth}
          x="-6"
          y={bandwidth / 2}
          dy="-0.25em"
          transform={`translate(${x(d.value)},${y(d.rank)})`}
        >
          <tspan>{d.name}</tspan>
          <tspan fillOpacity="0.7" fontWeight="normal" x="-6" dy="1.15em">
            {d.value}
          </tspan>
        </text>
      ))}
    </g>
  );
}
