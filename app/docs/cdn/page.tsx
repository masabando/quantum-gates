"use client"

import Code from "@/component/misc/Code"
import DocTitle from "@/component/misc/DocTitle"
import Keyword from "@/component/misc/Keyword"

export default function Page() {
  return (
    <div className="prose pb-20">
      <DocTitle>CDN Usage</DocTitle>

      <p className="my-20 text-2xl font-bold text-base-content">
        No build step —<br />
        just load and run.
      </p>

      <p className="text-base-content/80">
        <code className="px-1">@masabando/quantum-gates</code> can be used directly
        in the browser via a CDN.<br />
        This is useful for quick experiments,
        demos, and educational materials where a build step is unnecessary.
      </p>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-base-content">
        Using ESM in the browser
      </h2>
      <p className="text-base-content/80">
        Load the library as an ES module using a CDN such as <code>jsdelivr</code>. <br />
        Make sure to use <code>{`type="module"`}</code>.
      </p>

      <Code
        highlight={[7, 8, 9, 10, 11, 12, 13]}
        className="mt-6"
        language="javascript"
        code={ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="importmap">
    {
      "imports": {
        "@masabando/quantum-gates": "https://cdn.jsdelivr.net/npm/@masabando/quantum-gates/+esm"
      }
    }
  </script>
</head>
<body>

  <div id="target"></div>

  <script type="module">
    import { Complex } from "@masabando/quantum-gates"

    const a = new Complex(1, 2)
    const b = new Complex(3, 4)

    console.log(a.add(b).toString()) // "4 + 6i"

    QTool.createFidelityMap({
      target: "#target",
      gateName: "reduced CORPSE/BB1",
      theta: Math.PI,
      phi: 0,
      width: 400,
      height: 400,
    });

  </script>
</body>
</html>`}
      />

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-base-content">
        Bloch Sphere Animation
      </h2>
      <p className="text-base-content/80">
        This example visualizes a quantum state on the Bloch sphere in real time.<br />
        The animation uses <Keyword>easy-three</Keyword> as a lightweight 3D helper,
        while the quantum logic itself comes from quantum-gates.<br />
        <br />
        <Keyword>The target element must have an explicit width and height</Keyword>.
        By default, a div has zero height.
      </p>

      <Code
        language="javascript"
        className="mt-6"
        highlight={[...new Array(11).fill(0).map((_, i) => i + 8), 23]}
        code={`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.178.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.178.0/examples/jsm/",
        "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
        "@masabando/easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@1.11.6/dist/easy-three.js",
        "@masabando/quantum-gates": "https://cdn.jsdelivr.net/npm/@masabando/quantum-gates/+esm"
      }
    }
  </script>
</head>

<body>

  <div id="bloch" style="width: 400px; height: 400px;"></div>

  <script type="module">
    import { init } from "@masabando/easy-three";
    import { QTool, QState } from "@masabando/quantum-gates";

    QTool.createAnimation({
      init,
      target: "#bloch",
      pulseName: "reduced CORPSE/BB1",
      angle: Math.PI / 2,
      phi: 0,
      initState: new QState([1, 0]),
      speed: 4,
    })

  </script>
</body>

</html>`}
      />

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-base-content">
        When to use CDN
      </h2>
      <ul className="list text-base-content/80">
        <li className="list-row">Quick prototypes and small demos</li>
        <li className="list-row">Educational pages and lecture materials</li>
        <li className="list-row">Code pens or single-file experiments</li>
      </ul>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-base-content">
        Notes
      </h2>
      <ul className="text-base-content/80">
        <li>CDN usage relies on modern browsers with ES module support.</li>
        <li>For production applications, a bundler-based setup is recommended.</li>
      </ul>
    </div>
  )
}