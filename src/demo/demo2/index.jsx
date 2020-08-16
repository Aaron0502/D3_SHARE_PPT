import React, { useEffect, useRef } from "react";
import createBarRace from "./createBarRace";
import BarRace from './BarRace'

export default function Demo1() {
  const container = useRef(null);
  const replay = useRef(null);

  useEffect(() => {
    if (container.current !== null) {
      replay.current = createBarRace(container.current);
    }
  }, []);

  return (
    <div>
      <button onClick={() => replay.current?.()}>replay</button>
      <div ref={container}></div>
      {/* <BarRace /> */}
    </div>
  );
}
