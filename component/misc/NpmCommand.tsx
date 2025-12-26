"use client";

import { useState } from "react";

export default function NpmCommand() {
  const [text, setText] = useState("copy");

  return (
    <div className="flex animate-[reveal-top-slow_0.5s] flex-col items-center gap-6">
      <div className="tooltip tooltip-accent" data-tip={text}>
        <button
          className="btn btn-sm cursor-copy rounded-full font-mono font-light"
          onClick={() => {
            navigator.clipboard.writeText("npm i @masabando/quantum-gates");
            setText("copied!");
            setTimeout(() => setText("copy"), 2000);
          }}
        >
          <pre><code>npm i @masabando/quantum-gates</code></pre>
        </button>
      </div>
    </div>
  )
}
