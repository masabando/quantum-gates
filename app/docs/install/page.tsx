"use client"

import DocTitle from "@/component/misc/DocTitle"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>Installation</DocTitle>

      <p className="mt-20 mb-20 text-2xl font-bold text-base-content">
        Install once —<br />
        use everywhere.
      </p>

      <p className="text-base-content/80">
        <code className="px-1">@masabando/quantum-gates</code> works in modern
        environments: browser bundlers and Node.js.
      </p>

      <h2 className="mt-14 text-2xl font-bold tracking-tight text-base-content">
        Package managers
      </h2>
      <p className="text-base-content/80">
        Pick your tool. The package ships as ESM/CJS with TypeScript types.
      </p>

      <div className="not-prose mt-6">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="pm"
            role="tab"
            className="tab"
            aria-label="npm"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
            <pre className="m-0"><code>npm i @masabando/quantum-gates</code></pre>
          </div>

          <input type="radio" name="pm" role="tab" className="tab" aria-label="pnpm" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
            <pre className="m-0"><code>pnpm add @masabando/quantum-gates</code></pre>
          </div>

          <input type="radio" name="pm" role="tab" className="tab" aria-label="yarn" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
            <pre className="m-0"><code>yarn add @masabando/quantum-gates</code></pre>
          </div>

          <input type="radio" name="pm" role="tab" className="tab" aria-label="bun" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
            <pre className="m-0"><code>bun add @masabando/quantum-gates</code></pre>
          </div>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-bold tracking-tight text-base-content">
        Import
      </h2>
      <p className="text-base-content/80">
        Most users will use ESM. Import from the package root.
      </p>

      <div className="not-prose mt-6">
        <div className="mockup-code bg-base-100 border border-base-300">
          <pre data-prefix="$"><code>{`import { QGate, QState, QMatrix, Complex } from "@masabando/quantum-gates"`}</code></pre>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-bold tracking-tight text-base-content">
        Node.js (CommonJS)
      </h2>
      <p className="text-base-content/80">
        If your project uses <code className="px-1">require</code>, use the same entry.
      </p>

      <div className="not-prose mt-6">
        <div className="mockup-code bg-base-100 border border-base-300">
          <pre data-prefix="$"><code>{`const { QGate, QState } = require("@masabando/quantum-gates")`}</code></pre>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-bold tracking-tight text-base-content">
        Notes
      </h2>
      <ul className="text-base-content/80">
        <li>Directly importing files from <code className="px-1">dist/</code> is not recommended.</li>
        <li>For browsers, use a bundler (Vite / Next.js / Parcel / Webpack).</li>
      </ul>

      <div className="not-prose mt-10">
        <div className="alert alert-info">
          <span>
            If you run into import issues, check your runtime (ESM/CJS) and make sure you import from
            <code className="px-1 text-base-content">@masabando/quantum-gates</code>.
          </span>
        </div>
      </div>
    </div>
  )
}

