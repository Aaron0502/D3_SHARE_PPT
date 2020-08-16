import data from './dataSource'

export const width = 750
export const margin = { top: 16, right: 6, bottom: 6, left: 0 };
export const barSize = 35;

export const n = 12
export const duration = 250

export const height = margin.top + barSize * n + margin.bottom;

export const y = window.d3
  .scaleBand()
  .domain(window.d3.range(n + 1))
  .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
  .padding(0.1);

export const x = window.d3.scaleLinear([0, 1], [margin.left, width - margin.right])

const scale = window.d3.scaleOrdinal(window.d3.schemeTableau10);
export const color = function(d) {
  return scale(d.name);
}

export const formatDate = function(date) {
  return date.slice(0, 4)
}


const nameframes = window.d3.groups(data.flatMap(([, data]) => data), d => d.name)
export const next = new Map(nameframes.flatMap(([, data]) => window.d3.pairs(data)))
export const prev = new Map(nameframes.flatMap(([, data]) => window.d3.pairs(data, (a, b) => [b, a])))


const formatNumber = window.d3.format(",d")

export function textTween(a, b) {
  const i = window.d3.interpolateNumber(a, b);
  return function(t) {
    this.textContent = formatNumber(i(t));
  };
}
