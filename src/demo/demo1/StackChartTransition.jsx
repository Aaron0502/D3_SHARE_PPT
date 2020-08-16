import React from "react";
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
      viewBox={`${[0, 0, width, height]}`}
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
