![version](https://img.shields.io/github/v/tag/masabando/quantum-gates?style=flat&label=version)  
![last-commit](https://img.shields.io/github/last-commit/masabando/quantum-gates?style=flat)
![page-build-status](https://img.shields.io/github/actions/workflow/status/masabando/quantum-gates/nextjs.yml?style=flat)

![hits](https://img.shields.io/jsdelivr/gh/hm/masabando/quantum-gates?style=flat)
![npm](https://img.shields.io/npm/dm/%40masabando%2Fquantum-gates?style=flat&logo=npm)  
![license](https://img.shields.io/github/license/masabando/quantum-gates?style=flat)
![stars](https://img.shields.io/github/stars/masabando/quantum-gates?style=flat&logo=github)

# quantum-gates

[&#x1f389; Documentation](https://masabando.github.io/quantum-gates/)

A JavaScript library for simulating 1-qubit quantum gates and Composite Gates.

## see quantum states in 3D
See how quantum states move on the Bloch sphere.  
Drag, rotate, and explore them in 3D.

```js
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
```

## quantify gate quality
Visualize gate robustness with a fidelity map.  
Scan pulse-length and off-resonance errors in one view.

```js
import { QTool } from "@masabando/quantum-gates";
QTool.createFidelityMap({
  target: "#target",
  gateName: "reduced CORPSE/BB1",
  theta: Math.PI,
  phi: 0,
  width: 400,
  height: 400,
  // [ optional ]
  // threshold: 0.9999,
  // error: {
  //   ple: { min: -0.1, max: 0.1, step: 0.005 },
  //   ore: { min: -0.1, max: 0.1, step: 0.005 }
  // },
  // fillStyle: (val) => `rgb(${val}, ${val}, ${val})`,
});
```

## stop fightingquantum gateswith math

Quantum gates can be defined directly as rotations.  
You don’t need to write matrices to simulate their behavior.



```js
import { QGate, QState } from "@masabando/quantum-gates";
// Not Gate (with global phase)
// rotation around X-axis by PI
const gate = new QGate(Math.PI, [1, 0, 0])
// Initial State |0>
const state = new QState([1, 0])
// Bloch Vector (0, 0, 1)
console.log(state.xyz);
// X|0> = |1>
const finalState = gate.apply(state);
// Bloch Vector (0, 0, -1)
console.log(finalState.xyz);
```

## simple pulses becomerobust gates

Composite pulses are just sequences of simple rotations.  
They can be built directly from individual gates.

```js
import { QGate, QState } from "@masabando/quantum-gates";
// Pulse Length Error
const ple = 0.1; // 10% pulse length error
// up spin (0, 0, 1)
const initialState = new QState([1, 0]);
console.log(initialState.xyz);
// ple-affected 180y pulse (-0.31, 0, -0.95)
const pulse = new QGate(Math.PI * (1 + ple), [0, 1, 0]);
console.log(pulse.apply(initialState).xyz);
// composite pulse
// 90x
const p1 = new QGate(Math.PI / 2 * (1 + ple), [1, 0, 0])
// 180y
const p2 = new QGate(Math.PI * (1 + ple), [0, 1, 0])
// 90x
const p3 = new QGate(Math.PI / 2 * (1 + ple), [1, 0, 0])
const compositePulse = p3.multiply(p2).multiply(p1);
// (0.05, 0.01, -1)
console.log(compositePulse.apply(initialState).xyz);
```


## composite gatesjust work

Composite quantum gates can be used just like single gates.  
You can also evaluate them numerically by computing fidelity.

```js
import { QGate, QTool, CPList } from "@masabando/quantum-gates";
// error values for testing
// 10% pulse length error and 10% off-resonance error
const ple = 0.1;
const ore = 0.1;
// ideal 180x gate
const idealGate = new QGate(Math.PI, [1, 0, 0]);
// erroneous simple gate
const plain = QTool.evalGate(CPList["plain"].pulse, Math.PI, 0, ple, ore);
// erroneous composite gate
const corpse = QTool.evalGate(CPList["CORPSE"].pulse, Math.PI, 0, ple, ore);
// erroneous concatenated composite gate
const cccp = QTool.evalGate(CPList["reduced CORPSE/SK1"].pulse, Math.PI, 0, 
// fidelities
// 0.983
console.log(plain.fidelity(idealGate))
// 0.987
console.log(corpse.fidelity(idealGate))
// 0.995
console.log(cccp.fidelity(idealGate))
```

# How to Use


## Using npm

```bash
npm install @masabando/quantum-gates @masabando/easy-three
```
