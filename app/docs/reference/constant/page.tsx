"use client"

import Code from "@/component/misc/Code"
import { DocH2 } from "@/component/misc/DocHeader"
import DocSection from "@/component/misc/DocSection"
import DocTitle from "@/component/misc/DocTitle"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>Constant</DocTitle>

      <DocSection title="import">
        <Code language="typescript"
          className="my-4"
          code={`import { Constant } from "@masabando/quantum-gates"`} />
      </DocSection>

      <DocSection title="Description">
        <p>
          The <code>Constant</code> class provides predefined constant values used in quantum computing calculations.
        </p>
      </DocSection>

      <DocH2>Constants</DocH2>

      <DocSection title="PI">
        <Code language="typescript" className="my-4" code={`Constant.PI : number`} />
        <p>
          Represents the mathematical constant π (pi), approximately equal to 3.14159.
        </p>
      </DocSection>

      <DocSection title="E">
        <Code language="typescript" className="my-4" code={`Constant.E : number`} />
        <p>
          Represents the mathematical constant e (Euler&apos;s number), approximately equal to 2.71828.
        </p>
      </DocSection>

      <DocSection title="COMPLEX_I">
        <Code language="typescript" className="my-4" code={`Constant.COMPLEX_I : Complex`} />
        <p>
          Represents the imaginary unit i
          (<code>Complex(0, 1)</code>).
        </p>
      </DocSection>

      <DocSection title="COMPLEX_ONE">
        <Code language="typescript" className="my-4" code={`Constant.COMPLEX_ONE : Complex`} />
        <p>
          Represents the complex number 1
          (<code>Complex(1, 0)</code>).
        </p>
      </DocSection>
      
      <DocSection title="COMPLEX_ZERO">
        <Code language="typescript" className="my-4" code={`Constant.COMPLEX_ZERO : Complex`} />
        <p>
          Represents the complex number 0
          (<code>Complex(0, 0)</code>).
        </p>
      </DocSection>

      <DocSection title="PAULI_X">
        <Code language="typescript" className="my-4" code={`Constant.PAULI_X : QMatrix`} />
        <p>
          Represents the Pauli-X (NOT) gate matrix.
        </p>
      </DocSection>

      <DocSection title="PAULI_Y">
        <Code language="typescript" className="my-4" code={`Constant.PAULI_Y : QMatrix`} />
        <p>
          Represents the Pauli-Y gate matrix.
        </p>
      </DocSection>

      <DocSection title="PAULI_Z">
        <Code language="typescript" className="my-4" code={`Constant.PAULI_Z : QMatrix`} />
        <p>
          Represents the Pauli-Z gate matrix.
        </p>
      </DocSection>



      <DocH2>Static Methods</DocH2>

      <DocSection title="identity">
        <Code language="typescript" className="my-4" code={`Constant.identity(dim: number) : QMatrix`} />
        <p>
          Returns the identity matrix of dimension <code>dim</code>.
        </p>
      </DocSection>

      <DocSection title="zero">
        <Code language="typescript" className="my-4" code={`Constant.zero(dim: number) : QMatrix`} />
        <p>
          Returns the zero matrix of dimension <code>dim</code>.
        </p>
      </DocSection>
    </div>
  )
}