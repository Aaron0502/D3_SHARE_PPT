import React from "react";

const code = `svg.selectAll("text")
  .data(randomLetters(), d => d)
  .join(
    enter => enter.append("text")
      .attr("fill", "green")
      .attr("x", (d, i) => i * 16)
      .attr("y", -30)
      .text(d => d)
    .call(enter => enter.transition(t)
      .attr("y", 0)),
    update => update
      .attr("fill", "black")
      .attr("y", 0)
    .call(update => update.transition(t)
      .attr("x", (d, i) => i * 16)),
    exit => exit
      .attr("fill", "brown")
    .call(exit => exit.transition(t)
      .attr("y", 30)
      .remove())
);`;

export default function JoinsAdvantage() {
  return (
    <section>
      <section>
        <pre data-id="code">
          <code data-line-numbers className="hljs" data-trim>
            {code}
          </code>
        </pre>
      </section>
      <section>
        <ul>
          <li>
            使用 Join 的思想能让我们的代码更加直观.
            你只需要处理好这三种状态的集合, 而不需要 if 和 for
            来进行复杂的逻辑判断.
            你只需要描述好你的数据集合和DOM集合想要有怎样的对应关系.
          </li>
          <li>
            Join 还让你可以对不同状态的DOM元素进行不同的操作. 比如, 你可以只对
            enter 集合进行操作, 这样就不会每次都对所有的 DOM元素进行更新,
            这能显著的提升你的数据可视化作品的渲染效率.
          </li>
        </ul>
      </section>
    </section>
  );
}
