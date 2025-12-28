"use client"

import DocTitle from "@/component/misc/DocTitle"
import DocSection from "@/component/misc/DocSection"
import Code from "@/component/misc/Code"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>QGate</DocTitle>

      <DocSection title="Overview">
        <p>
          <code>QGate</code> represents a single-qubit quantum gate.
          Internally, a gate is stored as a 2×2 unitary matrix and can be
          applied to a quantum state, combined with other gates, or evaluated
          using fidelity.
        </p>
      </DocSection>

      <DocSection title="Import">
        <Code
          language="typescript"
          className="my-4"
          code={`import { QGate } from "@masabando/quantum-gates"`}
        />
      </DocSection>

      <DocSection title="Constructor">
        <p>
          A <code>QGate</code> can be constructed as a rotation around an arbitrary axis.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`/* rotation angle (rad) and axis vector */
const gate = new QGate(Math.PI / 2, [1, 0, 0])`}
        />
        <p>
          The axis vector is normalized internally. If a zero vector is given,
          an error is thrown.
        </p>
      </DocSection>

      <DocSection title="Applying a gate">
        <p>
          Gates can be applied to a quantum state using <code>apply</code>.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const next = gate.apply(state)`}
        />
      </DocSection>

      <DocSection title="Gate composition">
        <p>
          Gates can be combined by matrix multiplication using <code>multiply</code>.
          The returned gate represents sequential application.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const combined = gateA.multiply(gateB)`}
        />
      </DocSection>

      <DocSection title="Matrix operations">
        <p>
          <code>QGate</code> provides common matrix-related operations.
        </p>
        <ul>
          <li><code>dagger()</code>: Hermitian conjugate</li>
          <li><code>conjugate()</code>: Complex conjugate</li>
          <li><code>transpose()</code>: Matrix transpose</li>
        </ul>
      </DocSection>

      <DocSection title="Fidelity">
        <p>
          Fidelity measures how close two quantum gates are.
          It is computed from the trace of <code>U†V</code>.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const f = gate.fidelity(idealGate)
/* 0 ≤ f ≤ 1 */`}
        />
      </DocSection>

      <DocSection title="Notes">
        <ul>
          <li>
            Internally, a <code>QGate</code> always represents a single-qubit operation
            as a 2×2 unitary matrix.
          </li>
          <li>
            Methods such as <code>multiply</code> and <code>dagger</code> return new
            <code>QGate</code> instances and do not mutate the original object.
          </li>
        </ul>
      </DocSection>
    </div>
  )
}