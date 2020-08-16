import React, { useState, useEffect, useRef } from "react";
import { initialData } from "./data";
import createStackChart from "./createStackChart";
import StackChartTransition from './StackChartTransition'

export default function Demo1() {
  const [data, setData] = useState(initialData);
  const container = useRef(null);

  useEffect(() => {
    if (container.current !== null) {
      createStackChart(container.current, data);
    }
  }, [data]);

  function removeBlue() {
    setData((prevData) =>
      prevData.map((dataItem) => {
        const { b, ...rest } = dataItem;
        return rest;
      })
    );
  }

  return (
    <div>
      <button onClick={() => setData(initialData)}>恢复</button>
      <button onClick={removeBlue}>去除蓝色</button>
      {/* <div ref={container}></div> */}
      <StackChartTransition data={data} />
    </div>
  );
}
