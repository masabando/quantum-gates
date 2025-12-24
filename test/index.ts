import { QState, QGate, CPList } from "../src/index";

const plain = CPList.plain;
const BB1 = CPList.BB1;

const state = new QState([1, 0]);

const gate1 = new QGate(Math.PI, [1, 0, 0]);
let gate2 = new QGate(0, [1, 0, 0]);

for (const pulse of BB1.pulse) {
  const theta = pulse.theta(Math.PI, 0);
  const phi = pulse.phi(Math.PI, 0);
  const gate = new QGate(theta, [Math.cos(phi), Math.sin(phi), 0]);
  gate2 = gate2.multiply(gate);
}

console.log(gate1.apply(state).xyz)
console.log(gate2.apply(state).xyz)