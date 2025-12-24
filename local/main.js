import { CPList, QTool, QGate, QState } from "../dist/index.mjs";
import { init } from "@masabando/easy-three";

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


QTool.createAnimation({
  init,
  target: "#bloch",
  pulseName: "reduced CORPSE/BB1",
  angle: Math.PI / 2,
  phi: 0,
  initState: new QState([1, 0]),
  speed: 4,
})

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
const cccp = QTool.evalGate(CPList["reduced CORPSE/SK1"].pulse, Math.PI, 0, ple, ore);

// fidelities
// 0.983
console.log(plain.fidelity(idealGate))
// 0.987
console.log(corpse.fidelity(idealGate))
// 0.995
console.log(cccp.fidelity(idealGate))



// up spin
const initialState = new QState([1, 0]);
// (0, 0, 1)
console.log(initialState.xyz);

// ple-affected 180y pulse
const pulse = new QGate(Math.PI * (1 + ple), [0, 1, 0]);
// (-0.31, 0, -0.95)
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



