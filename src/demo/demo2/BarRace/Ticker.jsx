import React from "react";
import { n, width, margin, barSize, formatDate } from "../data";

// 文字tween动画todo
export default function Ticker(props) {
  const { data } = props;
  return (
    <text
      textAnchor="end"
      x={width - 6}
      y={margin.top + barSize * (n - 0.45)}
      dy="0.32em"
      style={{ fontVariantNumeric: "tabular-nums" }}
      fill="#fff"
      className="rect"
    >
      {formatDate(data[0])}
    </text>
  );
}
