"use client"
import DocTitle from "@/component/misc/DocTitle"

function Keyword(props: { children: React.ReactNode }) {
  return (
    <span className="text-accent"> {props.children} </span>
  )
}

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>Introduction</DocTitle>

      <p className="mt-20 text-2xl font-bold text-base-content mb-20">
        Focus on gates —<br />
        not equations.
      </p>

      <p className="text-base-content/80 leading-7">
        <code className="px-1">@masabando/quantum-gates</code> is a JavaScript library
        designed to make <Keyword>single-qubit quantum gates easier to understand, compose, and evaluate</Keyword>.
      </p>

      <h2 className="mt-14 text-base-content font-bold">Think in Rotations</h2>
      <p className="text-base-content/80">
        Quantum gates are fundamentally rotations on the Bloch sphere.<br />
        This library lets you describe gates in those terms directly,
        <Keyword>without translating ideas into matrices by hand</Keyword>.
      </p>

      <h2 className="mt-14 text-base-content font-bold">Compose, Don’t Derive</h2>
      <p className="text-base-content/80">
        Composite gates are built by sequencing simpler gates.<br />
        <Keyword>Instead of re-deriving new operators, you compose existing ones</Keyword>
        and treat the result as a first-class gate.
      </p>

      <h2 className="mt-14 text-base-content font-bold">Measure What You Build</h2>
      <p className="text-base-content/80">
        Gates are only useful if you can evaluate them.<br />
        The library provides tools to <Keyword>
          compute and visualize fidelity,
          making robustness and error sensitivity explicit
        </Keyword>.
      </p>

      <h2 className="mt-14 text-base-content font-bold">See It in Action</h2>
      <p className="text-base-content/80">
        <Keyword>Quantum states and gate operations can be visualized in 3D</Keyword>
        using the Bloch sphere.
        This makes abstract behavior tangible and easier to explore.
      </p>
    </div>
  )
}