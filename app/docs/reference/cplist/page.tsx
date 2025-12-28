"use client"

import Code from "@/component/misc/Code"
import DocSection from "@/component/misc/DocSection"
import DocTitle from "@/component/misc/DocTitle"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>CPList</DocTitle>

      <DocSection title="import">
        <Code language="typescript"
          className="my-4"
          code={`import { CPList } from "@masabando/quantum-gates"`}
        />
      </DocSection>

      <DocSection title="description">
        <p>
          <code>CPList</code> is a predefined collection of composite pulse (CP) sequences.
          Each entry describes how a target rotation <code>(θ, φ)</code> is decomposed into
          a sequence of robust pulses.
        </p>
      </DocSection>

      <DocSection title="Structure">
        <p>
          Each entry in <code>CPList</code> is an object with the following structure.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`type CP = {
  name: string
  robustType?: "ple" | "ore" | "both"
  rep?: "ple" | "ore" | false
  pulse: Pulse[]
}

/* Each pulse element */
type Pulse = {
  theta: (_theta: number, _phi: number) => number
  phi: (_theta: number, _phi: number) => number
  canReduce?: boolean
}`}
        />
      </DocSection>

      <DocSection title="Available composite pulses">
        <p>
          The following composite pulses are available by default. Some entries
          (e.g. <code>CORPSE/BB1</code>) are generated programmatically by <code>createCCCP</code>.
        </p>
        <ul className="list-disc ml-6 mt-4">
          <li><code>plain</code></li>
          <li><code>BB1</code></li>
          <li><code>SK1</code></li>
          <li><code>CORPSE</code></li>
          <li><code>shortCORPSE</code></li>
          <li><code>CORPSE/SK1</code></li>
          <li><code>SK1/CORPSE</code></li>
          <li><code>CORPSE/BB1</code></li>
          <li><code>BB1/CORPSE</code></li>
          <li><code>reduced CORPSE/SK1</code></li>
          <li><code>reduced CORPSE/BB1</code></li>
        </ul>
      </DocSection>

      <DocSection title="Usage">
        <p>
          <code>CPList</code> is typically passed to higher-level utilities such as
          gate construction or visualization tools. Users normally select a composite
          pulse by its key.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`import { CPList } from "@masabando/quantum-gates"

const cp = CPList["BB1"]

console.log(cp.name)
console.log(cp.pulse.length)`}
        />
      </DocSection>

      <DocSection title="createCCCP">
        <p>
          <code>createCCCP</code> creates a new composite pulse by concatenating two existing
          composite pulses in <code>CPList</code>.
        </p>
        <Code
          language="typescript"
          className="my-4"
          code={`import { createCCCP } from "@masabando/quantum-gates"

const cp = createCCCP("CORPSE", "BB1")

console.log(cp.name)
console.log(cp.robustType)
console.log(cp.rep)
console.log(cp.pulse.length)`}
        />
        <p>
          When <code>reduced</code> is set to <code>true</code>, elements in the second pulse
          marked with <code>canReduce</code> are kept as-is instead of being expanded.
        </p>
      </DocSection>

      <DocSection title="Notes">
        <ul>
          <li>
            The functions <code>theta</code> and <code>phi</code> are evaluated dynamically
            for a given target rotation.
          </li>
          <li>
            Reduced forms are controlled by <code>canReduce</code>. When <code>reduced=true</code>,
            elements in the second pulse marked with <code>canReduce</code> are not expanded
            during concatenation.
          </li>
          <li>
            Users usually do not need to modify <code>CPList</code> directly.
          </li>
        </ul>
      </DocSection>
    </div>
  )
}