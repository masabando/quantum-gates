"use client";
import Code from "@/component/misc/Code";
import Keyword from "@/component/misc/Keyword";
import NpmCommand from "@/component/misc/NpmCommand";
import SubTitle from "@/component/misc/SubTitle";
import { QTool, QState } from "../dist/index"
import { useEffect, useRef } from "react";
import { init } from "@masabando/easy-three";

export default function Home() {
  const animationRef = useRef<HTMLDivElement>(null);
  const fidelityMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { destroy } = QTool.createAnimation({
      init,
      target: animationRef.current,
      pulseName: "reduced CORPSE/BB1",
      angle: Math.PI / 2,
      phi: 0,
      initState: new QState([1, 0]),
      speed: 4,
    });

    QTool.createFidelityMap({
      target: fidelityMapRef.current,
      gateName: "reduced CORPSE/BB1",
      theta: Math.PI,
      phi: 0,
      width: 300,
      height: 300,
    });
    return destroy
  }, []);

  return (
    <div>
      <title>quantum-gates</title>
      <div className="px-4 pt-10 pb-40 flex flex-col gap-10 text-center">
        <h1 className="mb-10 text-center text-4xl font-bold md:text-5xl lg:text-6xl">
          quantum-gates
        </h1>
        <div className="mb-8 text-center leading-7 text-base-content/70 md:text-lg">
          A JavaScript library for simulating 1-qubit quantum gates and Composite Gates.
        </div>

        <NpmCommand />

        
        <div className="mt-16">
          <SubTitle>
            see quantum
            states
            in <Keyword>3D</Keyword>
          </SubTitle>
          <p className="mb-8 text-sm font-light">
            See how quantum states move on the Bloch sphere.<br />
            Drag, rotate, and explore them in 3D.
          </p>
          <div>
            ＼ drag me ／
          </div>
          <div ref={animationRef} style={{
            width: "400px",
            aspectRatio: "1 / 1",
            maxWidth: "80%",
            margin: "0 auto",
          }}></div>
          <Code className="text-xs" code={
            `import { init } from "@masabando/easy-three";
import { QTool, QState } from "@masabando/quantum-gates";
QTool.createAnimation({
  init,
  target: "#bloch",
  pulseName: "reduced CORPSE/BB1",
  angle: Math.PI / 2,
  phi: 0,
  initState: new QState([1, 0]),
  speed: 4,
})`}>
          </Code>
        </div>



        <div className="mt-16">
          <SubTitle>
            <Keyword>quantify</Keyword>
            gate
            quality
          </SubTitle>
          <p className="mb-8 text-sm font-light">
            Visualize gate robustness with a fidelity map.<br />
            Scan pulse-length and off-resonance errors in one view.
          </p>
          <div className="flex justify-center my-4 max-w-[60%] mx-auto">
            <div ref={fidelityMapRef}></div>
          </div>
          <Code className="text-xs" code={
            `import { QTool } from "@masabando/quantum-gates";
QTool.createFidelityMap({
  target: "#target",
  gateName: "reduced CORPSE/BB1",
  theta: Math.PI,
  phi: 0,
  width: 400,
  height: 400,
  // [ optional ]
  // threshold: 0.9999,
  // error: {
  //   ple: { min: -0.1, max: 0.1, step: 0.005 },
  //   ore: { min: -0.1, max: 0.1, step: 0.005 }
  // },
  // fillStyle: (val) => \`rgb(\${val}, \${val}, \${val})\`,
});
`}>
          </Code>
        </div>



        <div className="mt-16">
          <SubTitle>
            stop fighting
            <Keyword>quantum gates</Keyword>
            with math
          </SubTitle>
          <p className="mb-8 text-sm font-light">
            Quantum gates can be defined directly as rotations.<br />
            You don’t need to write matrices to simulate their behavior.
          </p>
          <Code className="text-xs" code={
`import { QGate, QState } from "@masabando/quantum-gates";
// Not Gate (with global phase)
// rotation around X-axis by PI
const gate = new QGate(Math.PI, [1, 0, 0])

// Initial State |0>
const state = new QState([1, 0])

// Bloch Vector (0, 0, 1)
console.log(state.xyz);

// X|0> = |1>
const finalState = gate.apply(state);

// Bloch Vector (0, 0, -1)
console.log(finalState.xyz);`}>
          </Code>
        </div>



        <div className="mt-16">
          <SubTitle>
            simple pulses
            become
            <Keyword>robust gates</Keyword>
          </SubTitle>
          <p className="mb-8 text-sm font-light">
            Composite pulses are just sequences of simple rotations.<br />
            They can be built directly from individual gates.
          </p>
          <Code className="text-xs" code={
`import { QGate, QState } from "@masabando/quantum-gates";

// Pulse Length Error
const ple = 0.1; // 10% pulse length error

// up spin (0, 0, 1)
const initialState = new QState([1, 0]);
console.log(initialState.xyz);

// ple-affected 180y pulse (-0.31, 0, -0.95)
const pulse = new QGate(Math.PI * (1 + ple), [0, 1, 0]);
console.log(pulse.apply(initialState).xyz);

// composite pulse
// 90x
const p1 = new QGate(Math.PI / 2 * (1 + ple), [1, 0, 0])
// 180y
const p2 = new QGate(Math.PI * (1 + ple), [0, 1, 0])
// 90x
const p3 = new QGate(Math.PI / 2 * (1 + ple), [1, 0, 0])
const compositePulse = p3.multiply(p2).multiply(p1);
// (0.05, 0.01, -1)
console.log(compositePulse.apply(initialState).xyz);`}>
          </Code>
        </div>



        <div className="mt-16">
          <SubTitle>
            <Keyword>composite gates</Keyword>
            just
            work
          </SubTitle>
          <p className="mb-8 text-sm font-light">
            Composite quantum gates can be used just like single gates.<br />
            You can also evaluate them numerically by computing fidelity.
          </p>
          <Code className="text-xs" code={
`import { QGate, QTool, CPList } from "@masabando/quantum-gates";

// error values for testing
// 10% pulse length error and 10% off-resonance error
const ple = 0.1;
const ore = 0.1;

// ideal 180x gate
const idealGate = new QGate(Math.PI, [1, 0, 0]);

// erroneous simple gate
const plain = QTool.evalGate(CPList["plain"].pulse, Math.PI, 0, ple, ore);
// erroneous composite gate
const corpse = QTool.evalGate(CPList["CORPSE"].pulse, Math.PI, 0, ple, ore);
// erroneous concatenated composite gate
const cccp = QTool.evalGate(CPList["reduced CORPSE/SK1"].pulse, Math.PI, 0, 

// fidelities
// 0.983
console.log(plain.fidelity(idealGate))
// 0.987
console.log(corpse.fidelity(idealGate))
// 0.995
console.log(cccp.fidelity(idealGate))`}>
          </Code>
        </div>
      </div>
    </div>
  );
}
