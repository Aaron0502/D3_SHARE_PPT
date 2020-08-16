import React, { useEffect, useState, useRef } from "react";
import Bar from "./Bar";
import Label from "./Label";
import Ticker from "./Ticker";
import { width, height, x, duration } from "../data";
import data from "../dataSource";
import "./index.scss";

function sleep(delay = 0) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export default function BarRace() {
  const [barData, setBarData] = useState();
  const replayRef = useRef(null);

  useEffect(() => {
    async function replay() {
      for (const keyframe of data) {
        x.domain([0, keyframe[1][0].value]);
        setBarData(keyframe);
        await sleep(duration);
      }
    }

    replay();
    replayRef.current = replay;
  }, []);
  return (
    <div>
      <button onClick={() => replayRef.current?.()}>replay</button>
      <svg viewBox={[0, 0, width, height]} className="bar-race-container">
        {barData && (
          <>
            <Bar data={barData} />
            <Label data={barData} />
            <Ticker data={barData} />
          </>
        )}
      </svg>
    </div>
  );
}
