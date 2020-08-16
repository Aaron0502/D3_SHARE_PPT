const d3 = require("d3");

export const margin = { top: 25, right: 50, bottom: 50, left: 50 };
export const height = 300;
export const width = 695;


export const initialData = [
  {
    category: "1",
    a: 1,
    b: 2,
    c: 3,
  },
  {
    category: "2",
    a: 6,
    b: 5,
    c: 4,
  },
  {
    category: "3",
    a: 2,
    b: 3,
    c: 5,
  },
  {
    category: "4",
    a: 7,
    b: 2,
    c: 5,
  },
  {
    category: "5",
    a: 2,
    b: 5,
    c: 6,
  },
  {
    category: "6",
    a: 3,
    b: 2,
    c: 3,
  },
  {
    category: "7",
    a: 5,
    b: 2,
    c: 5,
  },
  {
    category: "8",
    a: 4,
    b: 4,
    c: 3,
  },
];

export const colorMap = {
  a: "red",
  b: "blue",
  c: "green",
};

function getSeries(data) {
  const columns = Object.keys(data[0]);
  return d3.stack().keys(columns.slice(1))(data);
}

export function generateScale(data) {
  const series = getSeries(data);
  return {
    series,
    xScale: d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.1),
    yScale: d3
      .scaleLinear()
      .domain([
        0,
        d3.max(series, (d) => d3.max(d, (d) => d[1])),
      ])
      .range([height, 0]),
  };
}
