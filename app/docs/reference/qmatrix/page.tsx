"use client"

import DocTitle from "@/component/misc/DocTitle"
import DocSection from "@/component/misc/DocSection"
import Code from "@/component/misc/Code"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>QMatrix</DocTitle>

      <DocSection title="Overview">
        <p>
          <code>QMatrix</code> is a minimal utility class for handling small complex matrices.
          It is primarily used as an internal representation for quantum gates and constants,
          and focuses on clarity rather than performance optimizations.
        </p>
      </DocSection>

      <DocSection title="Import">
        <Code
          language="typescript"
          className="my-4"
          code={`import { QMatrix } from "@masabando/quantum-gates"`}
        />
      </DocSection>

      <DocSection title="Constructor">
        <p>
          A <code>QMatrix</code> is constructed from a two-dimensional array of numbers or
          <code>Complex</code> values. Numeric entries are automatically converted into
          complex numbers with zero imaginary part.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`import { QMatrix, Complex } from "@masabando/quantum-gates"

const m1 = new QMatrix([
  [1, 0],
  [0, 1],
])

const m2 = new QMatrix([
  [new Complex(0, 1), 0],
  [0, 1],
])`}
        />
      </DocSection>

      <DocSection title="Matrix size">
        <p>
          The number of rows and columns can be accessed via getters.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`console.log(m1.rows)
console.log(m1.cols)`}
        />
      </DocSection>

      <DocSection title="Addition">
        <p>
          <code>add</code> performs element-wise addition of two matrices with the same shape.
          If the dimensions do not match, an error is thrown.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const sum = m1.add(m2)`}
        />
      </DocSection>

      <DocSection title="Multiplication">
        <p>
          <code>multiply</code> computes the matrix product. The number of columns of the left
          matrix must match the number of rows of the right matrix.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const prod = m1.multiply(m2)`}
        />
      </DocSection>

      <DocSection title="Scaling">
        <p>
          <code>scale</code> multiplies every element by a scalar value.
          The scalar can be either a number or a <code>Complex</code> instance.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const half = m1.scale(0.5)
const phase = m1.scale(new Complex(0, 1))`}
        />
      </DocSection>

      <DocSection title="Conjugate, transpose, and dagger">
        <p>
          These methods return new matrices and do not mutate the original instance.
        </p>
        <ul>
          <li><code>conjugate()</code>: element-wise complex conjugation</li>
          <li><code>transpose()</code>: matrix transpose</li>
          <li><code>dagger()</code>: conjugate transpose</li>
        </ul>
        <Code
          language="typescript"
          className="my-4"
          code={`const c = m2.conjugate()
const t = m2.transpose()
const d = m2.dagger()`}
        />
      </DocSection>

      <DocSection title="Trace">
        <p>
          <code>trace</code> returns the sum of diagonal elements. For non-square matrices,
          the sum is taken up to <code>min(rows, cols)</code>.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`const tr = m2.trace()
console.log(tr.toString())`}
        />
      </DocSection>

      <DocSection title="String representation">
        <p>
          <code>toString</code> formats the matrix as a tab-separated grid. An optional
          argument controls the number of displayed digits.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`console.log(m2.toString())
console.log(m2.toString(4))`}
        />
      </DocSection>

      <DocSection title="Notes">
        <ul>
          <li>
            All operations return new <code>QMatrix</code> instances; the original matrix
            is never modified.
          </li>
          <li>
            <code>QMatrix</code> intentionally avoids advanced optimizations and validation,
            keeping the implementation simple and readable.
          </li>
        </ul>
      </DocSection>
    </div>
  )
}