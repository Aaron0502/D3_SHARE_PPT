import { width, height, margin, generateScale, colorMap } from "./data";

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
