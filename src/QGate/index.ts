import Complex from "../Complex";
import QMatrix from "../QMatrix";
import QState from "../QState";
import Constant from "../Constant";

export default class QGate {
  matrix: QMatrix;

  constructor(theta: number = 0, n: [number, number, number] = [1, 0, 0]) {
    const [nx, ny, nz] = n;
    const magnitude = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (magnitude === 0) {
      throw new Error("Rotation axis vector cannot be zero");
    }
    const [ux, uy, uz] = [nx / magnitude, ny / magnitude, nz / magnitude];
    const cos = Math.cos(theta / 2);
    const sin = -Math.sin(theta / 2);

    const realPart = Constant.IDENTITY_2x2
      .scale(new Complex(cos, 0))
    const imaginaryPartX = Constant.PAULI_X
      .scale(new Complex(0, ux * sin));
    const imaginaryPartY = Constant.PAULI_Y
      .scale(new Complex(0, uy * sin));
    const imaginaryPartZ = Constant.PAULI_Z
      .scale(new Complex(0, uz * sin));
    this.matrix = realPart
      .add(imaginaryPartX)
      .add(imaginaryPartY)
      .add(imaginaryPartZ);
  }

  setMatrix(matrix: QMatrix): QGate {
    this.matrix = matrix;
    return this;
  }

  dagger(): QGate {
    const m = this.matrix.dagger();
    const gate = new QGate(0, [1, 0, 0]); // temporary values
    gate.setMatrix(m);
    return gate;
  }

  conjugate(): QGate {
    const m = this.matrix.conjugate();
    const gate = new QGate(0, [1, 0, 0]); // temporary values
    gate.setMatrix(m);
    return gate;
  }

  transpose(): QGate {
    const m = this.matrix.transpose();
    const gate = new QGate(0, [1, 0, 0]); // temporary values
    gate.setMatrix(m);
    return gate;
  }

  apply(stateVector: QState): QState {
    const resultVector = new Array<Complex>(this.matrix.rows).fill(new Complex(0, 0));

    for (let i = 0; i < this.matrix.rows; i++) {
      for (let j = 0; j < this.matrix.cols; j++) {
        resultVector[i] = resultVector[i].add(
          this.matrix.matrix[i][j].multiply(stateVector.vector[j])
        );
      }
    }
    return new QState(resultVector);
  }

  multiply(other: QGate): QGate {
    const m = this.matrix.multiply(other.matrix);
    const gate = new QGate(0, [1, 0, 0]); // temporary values
    gate.setMatrix(m);
    return gate;
  }

  trace(): Complex {
    return this.matrix.trace();
  }

  fidelity(ideal: QGate): number {
    const dim = this.matrix.rows;
    const product = this.matrix.dagger().multiply(ideal.matrix);
    const trace = product.trace();
    const fidelity = trace.magnitude() / dim;
    return fidelity;
  }
}