"use client"

import Code from "@/component/misc/Code"
import { DocH2, DocH4} from "@/component/misc/DocHeader"
import DocSection from "@/component/misc/DocSection"
import DocTitle from "@/component/misc/DocTitle"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>Complex</DocTitle>


      <DocSection title="import">
        <Code language="typescript"
          className="my-4"
          code={`import { Complex } from "@masabando/quantum-gates"`}
        />
      </DocSection>

      <DocSection title="Description">
        <p>
          The <code>Complex</code> class represents complex numbers and provides methods for complex number operations.
        </p>
      </DocSection>

      <DocSection title="constructor">
        <Code language="typescript"
          className="my-4"
          code={`new Complex(realPart: number, imaginaryPart: number) : Complex`}
        />
        <p>
          Creates a new complex number with the specified real (<code>realPart</code>) and imaginary (<code>imaginaryPart</code>) parts.
        </p>
      </DocSection>

      <DocH2>Methods</DocH2>

      <DocSection title="add">
        <Code language="typescript"
          className="my-4"
          code={`add(other: Complex) : Complex`}
        />
        <p>
          Adds this complex number to another complex number (<code>other</code>) and returns the result as a new <code>Complex</code> instance.
        </p>

        <DocH4>Example</DocH4>
        <Code language="typescript"
          className="my-4"
          code={`const a = new Complex(1, 2); // 1 + 2i
const b = new Complex(3, 4); // 3 + 4i
const result = a.add(b); // result is 4 + 6i`}
        />
      </DocSection>

      <DocSection title="multiply">
        <Code language="typescript"
          className="my-4"
          code={`multiply(other: Complex) : Complex`}
        />
        <p>
          Multiplies this complex number by another complex number (<code>other</code>) and returns the result as a new <code>Complex</code> instance.
        </p>

        <DocH4>Example</DocH4>
        <Code language="typescript"
          className="my-4"
          code={`const a = new Complex(1, 2); // 1 + 2i
const b = new Complex(3, 4); // 3 + 4i
const result = a.multiply(b); // result is -5 + 10i`}
        />
      </DocSection>

      <DocSection title="scale">
        <Code language="typescript"
          className="my-4"
          code={`scale(scalar: number) : Complex`}
        />
        <p>
          Scales this complex number by a real number (<code>scalar</code>) and returns the result as a new <code>Complex</code> instance.
        </p>

        <DocH4>Example</DocH4>
        <Code language="typescript"
          className="my-4"
          code={`const a = new Complex(1, 2); // 1 + 2i
const result = a.scale(3); // result is 3 + 6i`}
        />
      </DocSection>

      <DocSection title="toString">
        <Code language="typescript"
          className="my-4"
          code={`toString(digits?: number) : string`}
        />
        <p>
          Returns a string representation of the complex number. If <code>digits</code> is provided, the real and imaginary parts are formatted to the specified number of decimal places.
        </p>

        <DocH4>Example</DocH4>
        <Code language="typescript"
          className="my-4"
          code={`const a = new Complex(1.23456, 2.34567);
console.log(a.toString()); // "1.23456 + 2.34567i"
console.log(a.toString(2)); // "1.23 + 2.35i"`}
        />
      </DocSection>

      <DocSection title="magnitude">
        <Code language="typescript"
          className="my-4"
          code={`magnitude() : number`}
        />
        <p>
          Returns the magnitude (absolute value) of the complex number.
        </p>

        <DocH4>Example</DocH4>
        <Code language="typescript"
          className="my-4"
          code={`const a = new Complex(3, 4);
console.log(a.magnitude()); // 5`}
        />
      </DocSection>

      <DocSection title="conjugate">
        <Code language="typescript"
          className="my-4"
          code={`conjugate() : Complex`}
        />
        <p>
          Returns the complex conjugate of this complex number as a new <code>Complex</code> instance.
        </p>

        <DocH4>Example</DocH4>
        <Code language="typescript"
          className="my-4"
          code={`const a = new Complex(1, 2); // 1 + 2i
const result = a.conjugate(); // result is 1 - 2i`}
        />
      </DocSection>

      <DocH2>Method Chaining</DocH2>
      <p>
        The methods of the <code>Complex</code> class can be chained together to perform multiple operations in a single expression.
      </p>

      <DocH4>Example</DocH4>
      <Code language="typescript"
        className="my-4"
        code={`const a = new Complex(1, 2); // 1 + 2i
const b = new Complex(3, 4); // 3 + 4i

const result = a.add(b).scale(2).conjugate().toString(); // result is "-8 - 12i"

/* You can also break it down for clarity */
const anotherResult = a.add(b)
  .scale(2)
  .conjugate()
  .toString();
`}
      />
    </div>
  )
}