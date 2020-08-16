import React from "react";

const singleCirCle = `svg
  .append("circle")
  .attr("cx", d.x)
  .attr("cy", d.y)
  .attr("r", 2.5);`;

const quarterCircleForeach = `for(let i = 0; i < 4; i ++) {
  svg
    .append("circle")
    .attr("cx", d[i].x)
    .attr("cy", d[i].y)
    .attr("r", 2.5);
}`;

const quarterCircleJoin = `svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("r", 2.5);`;

export default function Joins() {
  return (
    <section>
      <section data-auto-animate style={{ height: 600 }}>
        <div
          data-id="1"
          style={{
            background: "cyan",
            position: "absolute",
            top: "50%",
            left: "25%",
            width: "200px",
            height: "200px",
            margin: "-200px 0 0 -200px",
            borderRadius: "200px",
          }}
        ></div>
        <div data-id="2"></div>
        <div data-id="3"></div>
        <div data-id="4"></div>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "50%",
            top: "55%",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {singleCirCle}
          </code>
        </pre>
      </section>
      <section data-auto-animate style={{ height: 600 }}>
        <div
          data-id="1"
          style={{
            background: "red",
            position: "absolute",
            top: "100px",
            left: "16%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <div
          data-id="2"
          style={{
            background: "yellow",
            position: "absolute",
            top: "100px",
            left: "36%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <div
          data-id="3"
          style={{
            background: "magenta",
            position: "absolute",
            top: "100px",
            left: "56%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <div
          data-id="4"
          style={{
            background: "cyan",
            position: "absolute",
            top: "100px",
            left: "76%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "410px",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {quarterCircleForeach}
          </code>
        </pre>
      </section>
      <section data-auto-animate style={{ height: 600 }}>
        <div
          data-id="1"
          style={{
            background: "red",
            position: "absolute",
            top: "30px",
            left: "16%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <div
          data-id="2"
          style={{
            background: "yellow",
            position: "absolute",
            top: "30px",
            left: "36%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <div
          data-id="3"
          style={{
            background: "magenta",
            position: "absolute",
            top: "30px",
            left: "56%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <div
          data-id="4"
          style={{
            background: "cyan",
            position: "absolute",
            top: "30px",
            left: "76%",
            width: "60px",
            height: "60px",
            borderRadius: "60px",
          }}
        ></div>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "350px",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {quarterCircleJoin}
          </code>
        </pre>
        <div
          style={{
            fontSize: "30px",
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "600px",
          }}
        >
          这段代码的思想是: 不要告诉D3如何去做, 而是告诉D3你想要的效果.
          你想要circle元素和数据一一对应, 那么你就不应该告诉D3去创建circle元素,
          而是告诉D3: <b style={{ color: "#00FFFF" }}>.selectAll("circle")</b>
          得到的circle集合应该和<b style={{ color: "#00FFFF" }}>.data(data)</b>
          一一对应. 这个思想就叫做 Join.
        </div>
      </section>
      <section>
        <img width="500px" src="../join.png" alt="" />
        <ul
          style={{
            fontSize: "30px",
          }}
        >
          <li>数据集合 和 DOM元素集合 相交产生了中间的 update 集合</li>
          <li>
            没有DOM元素与之对应的Data产生了左边的 enter 集合 (也就是缺失DOM元素)
          </li>
          <li>
            没有数据与之对应的DOM元素产生了右边的 exit 集合
            (也就意味着这些DOM元素将被移除)
          </li>
        </ul>
      </section>
      <section data-auto-animate style={{ height: 600 }}>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "200px",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {quarterCircleJoin}
          </code>
        </pre>
        <div
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "450px",
            fontSize: "30px",
          }}
          data-id="description"
        >
          首先, <b style={{ color: "#00FFFF" }}>svg.selectAll("circle") </b>
          返回的是一个空的集合, 因为当前 svg 容器还是空的.
        </div>
      </section>
      <section data-auto-animate style={{ height: 600 }}>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "200px",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {quarterCircleJoin}
          </code>
        </pre>
        <div
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "450px",
            fontSize: "30px",
          }}
          data-id="description"
        >
          <b style={{ color: "#00FFFF" }}>svg.selectAll("circle") </b>
          返回的集合接下来和 data 进行 Join 操作,
          得到的就是我们上面提到的三个集合: update 集合 , enter 集合 , exit
          集合. 因为初始时 Elements集合(也就是circle集合)是空的, 所以 update 和
          exit 集合为空, 而 enter 集合会自动为每一个新的data元素生成一个占位符.
        </div>
      </section>
      <section data-auto-animate style={{ height: 600 }}>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "200px",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {quarterCircleJoin}
          </code>
        </pre>
        <div
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "450px",
            fontSize: "30px",
          }}
          data-id="description"
        >
          默认 <b style={{ color: "#00FFFF" }}>.data(data) </b>返回的是 update
          集合, 因为 update 集合为空, 所以我们不对其进行操作, 这里我们调用
          .enter() 得到 enter 集合.
        </div>
      </section>
      <section data-auto-animate style={{ height: 600 }}>
        <pre
          data-id="code"
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "200px",
          }}
        >
          <code data-line-numbers className="hljs" data-trim>
            {quarterCircleJoin}
          </code>
        </pre>
        <div
          style={{
            position: "absolute",
            margin: "-200px 0 0 -200px",
            left: "30%",
            top: "450px",
            fontSize: "30px",
          }}
          data-id="description"
        >
          接下来, 对于 enter 集合中的每一个元素, 我们使用{" "}
          <b style={{ color: "#00FFFF" }}>selection.append('circle') </b>
          (值得注意的是, 对集合的操作会被应用到集合中的每一个元素上去).
          这样就为每一个数据点创建了一个 circle (这些circle都在他们的父节点 svg
          中)
        </div>
      </section>
      <section>
        <img src="../joinList.png" alt=""/>
      </section>
    </section>
  );
}
