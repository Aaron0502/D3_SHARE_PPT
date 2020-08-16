import React from "react";

export default function Draw_chart() {
  return (
    <section>
      <section>
        <img src="../simpleChart.png" alt="" />
      </section>
      <section data-auto-animate>
        <h4 data-id="draw-chart-title">d3绘图步骤</h4>
        <ul data-id="draw-chart-detail">
          <li>根据需求确定chart类型</li>
          <li>数据处理，完成原始数据到图形属性的映射</li>
          <li>绘制图形及其细节部分</li>
          <li>给已经完成的图形添加动画效果和事件交互</li>
        </ul>
      </section>
      <section data-auto-animate>
        <h4 data-id="draw-chart-title">
          还记得小学数学很常见的一类题，给你数据让你画一个条形图或者折线图，最后问你一个发现了什么的问题，作图步骤基本一致
        </h4>
      </section>
      <section data-auto-animate>
        <h4 data-id="draw-chart-title">制作条形统计图的步骤是：</h4>
        <ul data-id="draw-chart-detail">
          <li>根据统计资料整理数据</li>
          <li>
            作图定标尺．先画纵轴，确定一定的比例（即标尺），作为长度单位；再画横轴，纵、横轴的长短要适中
          </li>
          <li>画直条．条形的宽度、间隔要一致</li>
          <li>写上条形统计图的总标题、制图日期及数量单位</li>
        </ul>
      </section>
    </section>
  );
}
