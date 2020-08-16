import React, { useEffect } from "react";
import Reveal from "reveal.js";
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/night.css";
import "reveal.js/plugin/highlight/monokai.css"


const ppt = require.context("./ppt", false, /\.jsx$/)

function App() {
  useEffect(() => {
    Reveal.initialize({
      center: true,
      hash: true,
      plugins: [ RevealHighlight ]
      // transition: 'slide',
      // transitionSpeed: 'slow',
      // backgroundTransition: 'slide'
    });
  }, []);
  return (
    <div className="slides">
      {
        ppt.keys().map(key => {
          const Detail = ppt(key).default
          return <Detail key={key}/>
        })
      }
    </div>
  );
}

export default App;
