"use client"

import DocSection from "@/component/misc/DocSection"
import DocTitle from "@/component/misc/DocTitle"
import Code from "@/component/misc/Code"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>QState</DocTitle>

      <DocSection title="Overview">
        <p>
          <code>QState</code> represents a quantum state vector.
          It stores a vector of <code>Complex</code> amplitudes and provides utilities
          for normalization, conjugation, and inner products.
        </p>
      </DocSection>

      <DocSection title="Import">
        <Code
          language="typescript"
          className="my-4"
          code={`import { QState } from "@masabando/quantum-gates"`}
        />
      </DocSection>

      <DocSection title="Constructor">
        <p>
          Create a state from an array of numbers or <code>Complex</code> values.
          By default, the state is treated as a column vector.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`import { QState, Complex } from "@masabando/quantum-gates"

const ket0 = new QState([1, 0])
const ket1 = new QState([0, 1])

const psi = new QState([
  new Complex(1 / Math.sqrt(2), 0),
  new Complex(0, 1 / Math.sqrt(2)),
])`}
        />
      </DocSection>

      <DocSection title="Row / column vectors">
        <p>
          <code>QState</code> can represent either a column vector (<code>|ψ⟩</code>) or a row
          vector (<code>⟨ψ|</code>). Many operations require the correct orientation.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const ket = new QState([1, 0], true)  // column (default)
const bra = ket.dagger()               // row`}
        />
      </DocSection>

      <DocSection title="Scaling and normalization">
        <p>
          Use <code>scale</code> to multiply amplitudes by a scalar.
          <code>magnitude</code> returns the vector norm, and <code>normalize</code> returns
          a normalized state.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const s = new QState([2, 0])

console.log(s.magnitude())

const sn = s.normalize()
const half = sn.scale(0.5)`}
        />
      </DocSection>

      <DocSection title="Transpose / conjugate / dagger">
        <p>
          These methods return new states.
        </p>
        <ul>
          <li><code>transpose()</code>: swaps row and column orientation</li>
          <li><code>conjugate()</code>: element-wise complex conjugation</li>
          <li><code>dagger()</code>: conjugate transpose (<code>conjugate().transpose()</code>)</li>
        </ul>
        <Code
          language="typescript"
          className="my-4"
          code={`const bra = ket.dagger()
const ket2 = bra.dagger()`}
        />
      </DocSection>

      <DocSection title="Inner product">
        <p>
          Compute an inner product <code>⟨ψ|φ⟩</code> using <code>applyState</code>.
          The left operand must be a row vector and the right operand must be a
          column vector.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const psi = new QState([1, 0])
const phi = new QState([0, 1])

const inner = psi.dagger().applyState(phi)
console.log(inner.toString())`}
        />
      </DocSection>

      <DocSection title="Applying a matrix">
        <p>
          Apply a matrix to a state using <code>applyMatrix</code>. This operation
          follows the orientation rules used in the implementation.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`// row vector × matrix
const braNext = bra.applyMatrix(matrix)`}
        />
      </DocSection>

      <DocSection title="Bloch coordinates">
        <p>
          For a single-qubit state (column vector), <code>xyz</code> returns the Bloch
          sphere coordinates computed from Pauli expectations.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const psi = new QState([1, 0])

const { x, y, z } = psi.xyz
console.log(x, y, z)`}
        />
      </DocSection>

      <DocSection title="Notes">
        <ul>
          <li>
            <code>QState</code> does not automatically normalize the vector.
          </li>
          <li>
            Methods throw errors when the orientation (row/column) or dimensions
            are incompatible.
          </li>
        </ul>
      </DocSection>
    </div>
  )
}