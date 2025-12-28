"use client"

import DocSection from "@/component/misc/DocSection"
import DocTitle from "@/component/misc/DocTitle"
import Code from "@/component/misc/Code"
import { DocH4 } from "@/component/misc/DocHeader"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>QTool</DocTitle>

      <DocSection title="Overview">
        <p>
          <code>QTool</code> is a collection of browser-side utilities for evaluating and
          visualizing quantum gates. It focuses on rendering, animation, and error analysis,
          rather than defining core mathematical primitives.
        </p>
      </DocSection>

      <DocSection title="Import">
        <Code
          language="typescript"
          className="my-4"
          code={`import { QTool } from "@masabando/quantum-gates"`}
        />
      </DocSection>

      <DocSection title="Evaluating composite pulses">
        <p>
          <code>evalGate</code> converts a composite pulse definition into an actual
          <code>QGate</code>, optionally including pulse-length error (PLE) and off-resonance
          error (ORE).
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const gate = QTool.evalGate(
  "BB1",
  Math.PI / 2, // angle
  0, // rotation axis phase
  0.02, // ple
  0.01 // ore
)`}
        />
      </DocSection>

      <DocSection title="Canvas helper">
        <p>
          <code>createCanvas2D</code> creates and attaches a 2D canvas to a target element.
          The target must have an explicit size; otherwise, nothing will be rendered.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const { canvas, ctx, clearCanvas } = QTool.createCanvas2D(
  "#canvas",
  { width: 400, height: 400 }
)`}
        />
      </DocSection>

      <DocSection title="Error grid generation">
        <p>
          <code>createErrorList</code> generates a two-dimensional grid of PLE and ORE values.
          This grid is typically used as the basis for fidelity calculations.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const errorList = QTool.createErrorList({
  ple: [-0.05, 0.05],
  ore: [-0.05, 0.05],
})`}
        />
      </DocSection>

      <DocSection title="Fidelity calculation">
        <p>
          <code>calculateFidelity</code> evaluates gate fidelity over an error grid by
          comparing a composite pulse against the ideal rotation.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const { errorList, fidelityList } = QTool.calculateFidelity(
  "BB1",
  Math.PI / 2,
  0,
  { ple: [-0.05, 0.05], ore: [-0.05, 0.05] }
)`}
        />
      </DocSection>

      <DocSection title="Fidelity map rendering">
        <Code
          language="typescript"
          className="my-4"
          code={`createFidelityMap({
  target: string | HTMLElement,
  gateName: string,
  theta: number,
  phi: number,
  width: number,
  height: number,
  threshold?: number, // default: 0.9999
  fillStyle?: (val: number) => string, // default: (val) => \`rgb(\${val}, \${val}, \${val})\`
  overFill?: number, // default: 1
  error?: {
    ple: {
      min: number, // default: -0.1
      max: number, // default: 0.1
      step: number // default: 0.005
    },
    ore: {
      min: number, // default: -0.1
      max: number, // default: 0.1
      step: number // default: 0.005
    }
  }
}) : void`}
        />
        <p>
          <code>createFidelityMap</code> visualizes fidelity values as a 2D heatmap.
          Pulse-length error is mapped to the vertical axis, and off-resonance error
          to the horizontal axis.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`QTool.createFidelityMap({
  target: "#map",
  gateName: "BB1",
  theta: Math.PI / 2,
  phi: 0,
  width: 400,
  height: 400,
  threshold: 0.9999,
})`}
        />
      </DocSection>

      <DocSection title="Bloch sphere animation">
        <Code
          language="typescript"
          className="my-4"
          code={`createAnimation({
  init: easyThreeInitFunction,
  target: string | HTMLElement,
  pulseName: string,
  angle: number,
  phi: number,
  initState: QState,
  speed: number,
  draggable?: boolean, // default: true
  light?: {
    ambient: {
      intensity: number // default: 0.4
    },
    directional: {
      intensity: number, // default: 0.6
      position: [number, number, number] // default: [-10, 10, -10]
    }
  },
  bloch?: {
    ringWeight: number, // default: 0.01
    ringNum: {
      azimuthal: number, // default: 7,
      polar: number // default: 8
    },
    color: {
      sphere: number, // default: 0x888888
      ringMain: number, // default: 0x5555ff
      ringSub: number // default: 0xffffff
    }
  }
  point?: {
    size: {
      normal: number, // default: 0.04
      errorP: number // default: 0.04
      errorN: number // default: 0.04
    },
    color: {
      normal: number, // default: 0x7777ff
      errorP: number, // default: 0xff7777
      errorN: number // default: 0xffaaaa
    }
  },
  view?: {
    position: [number, number, number], // default: [0, 0, -2]
  }
}) : AnimationController`}
        />
        <p>
          <code>createAnimation</code> creates an animated Bloch-sphere visualization
          showing the time evolution of quantum states under a composite pulse.
          This feature relies on <code>easy-three</code> and runs in the browser.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`import { init } from "@masabando/easy-three";
import { QTool, QState } from "@masabando/quantum-gates";

const animation = QTool.createAnimation({
  init,
  target: "#bloch",
  pulseName: "BB1",
  angle: Math.PI / 2,
  phi: 0,
  initState: new QState([1, 0]),
  speed: 4,
})`}
        />

        <DocH4>for React</DocH4>
        <p>
          When using <code>createAnimation</code> within a React component,
          ensure to properly clean up the animation on unmount to prevent memory leaks.<br />
          Use the <code>destroy</code> method returned by <code>createAnimation</code>.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`import { useEffect, useRef } from "react";
import { init } from "@masabando/easy-three";
import { QTool, QState } from "@masabando/quantum-gates";

function Component() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { destroy } = QTool.createAnimation({
      init,
      target: ref.current,
      pulseName: "BB1",
      angle: Math.PI / 2,
      phi: 0,
      initState: new QState([1, 0]),
      speed: 4,
    });

    return destroy;
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: "400px", height: "400px" }}
    ></div>
  );
}`}
        />


      </DocSection>

      <DocSection title="Notes">
        <ul>
          <li>
            <code>QTool</code> is intended for visualization and evaluation, not for defining
            new quantum primitives.
          </li>
          <li>
            All methods are static and do not maintain internal state.
          </li>
          <li>
            Most APIs assume a browser environment with access to the DOM.
          </li>
        </ul>
      </DocSection>
    </div>
  )
}