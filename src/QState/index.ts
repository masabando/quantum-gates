import Complex from "../Complex";
import QMatrix from "../QMatrix";
import Constant from "../Constant";

export default class QState {
  vector: Complex[];
  column: boolean = true;

  constructor(vector: number[] | Complex[], column: boolean = true) {
    this.column = column;
    this.vector = vector.map(value =>
      value instanceof Complex ? value : new Complex(value, 0)
    );
  }

  toString(digit: number): string {
    return `[${this.vector.map(value => value.toString(digit)).join(this.column ? "\n" : ", ")}]`;
  }

  scale(scalar: Complex | number): QState {
    const factor = scalar instanceof Complex ? scalar : new Complex(scalar, 0);
    const scaledVector = this.vector.map(value => value.multiply(factor));
    return new QState(scaledVector, this.column);
  }

  magnitude(): number {
    let sum = 0;
    for (const value of this.vector) {
      sum += value.magnitude() ** 2;
    }
    return Math.sqrt(sum);
  }

  normalize(): QState {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return this.scale(1 / mag);
  }


  transpose(): QState {
    return new QState(this.vector, !this.column);
  }

  conjugate(): QState {
    const conjugatedVector = this.vector.map(value => value.conjugate());
    return new QState(conjugatedVector, this.column);
  }

  dagger(): QState {
    return this.conjugate().transpose();
  }

  get isColumn(): boolean {
    return this.column;
  }

  get values(): Complex[] | Complex[][] {
    return this.vector;
  }

  applyMatrix(matrix: QMatrix): QState {
    if (this.column) {
      throw new Error("Matrix application is only defined for row vectors");
    }
    if (matrix.cols !== this.vector.length) {
      throw new Error("Incompatible sizes for matrix application");
    }

    const result: Complex[] = Array.from({ length: matrix.rows }, () => new Complex(0, 0));

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        result[i] = result[i].add(matrix.matrix[j][i].multiply(this.vector[j]));
      }
    }

    return new QState(result, false);
  }

  // <v1|v2>
  applyState(state: QState): Complex {
    if (this.column || !state.column) {
      throw new Error("Incompatible sizes for state application");
    }
    if (this.vector.length !== state.vector.length) {
      throw new Error("State vectors must be of the same length for application");
    }

    let result = new Complex(0, 0);
    for (let i = 0; i < this.vector.length; i++) {
      result = result.add(this.vector[i].multiply(state.vector[i]));
    }

    return result;
  }

  get xyz(): { x: number; y: number; z: number } {
    if (!this.column) {
      throw new Error("State vector must be a column vector to compute xyz coordinates");
    }
    const dagger = this.dagger();
    const x = dagger.applyMatrix(Constant.PAULI_X).applyState(this).realPart;
    const y = dagger.applyMatrix(Constant.PAULI_Y).applyState(this).realPart;
    const z = dagger.applyMatrix(Constant.PAULI_Z).applyState(this).realPart;

    return { x, y, z };
  }
}
