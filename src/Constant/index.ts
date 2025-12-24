import Complex from "../Complex";
import QMatrix from "../QMatrix";
// import QGate from "../QGate";

export default class Constant {
  static readonly PI = Math.PI;
  static readonly E = Math.E;
  // identity matrix for 2x2
  static readonly IDENTITY_2x2 = new QMatrix([
    [1, 0],
    [0, 1],
  ]);
  // identity matrix for 3x3
  static readonly IDENTITY_3x3 = new QMatrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
  // identity matrix for 4x4
  static readonly IDENTITY_4x4 = new QMatrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);

  static readonly identity = (dim: number) => {
    return new QMatrix(
      Array.from({ length: dim }, (_, i) =>
        Array.from({ length: dim }, (_, j) => (i === j ? 1 : 0))
      )
    );
  };

  static readonly zero = (dim: number) => {
    return new QMatrix(
      Array.from({ length: dim }, () =>
        Array.from({ length: dim }, () => 0)
      )
    );
  };

  // zero matrix for 2x2
  static readonly ZERO_2x2 = new QMatrix([
    [0, 0],
    [0, 0],
  ]);
  // zero matrix for 3x3
  static readonly ZERO_3x3 = new QMatrix([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  // zero matrix for 4x4
  static readonly ZERO_4x4 = new QMatrix([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // common complex numbers
  static readonly COMPLEX_I = new Complex(0, 1);
  static readonly COMPLEX_ONE = new Complex(1, 0);
  static readonly COMPLEX_ZERO = new Complex(0, 0);

  // pauli matrices
  static readonly PAULI_X = new QMatrix([
    [0, 1],
    [1, 0],
  ]);
  static readonly PAULI_Y = new QMatrix([
    [new Complex(0, 0), new Complex(0, -1)],
    [new Complex(0, 1), new Complex(0, 0)],
  ]);
  static readonly PAULI_Z = new QMatrix([
    [1, 0],
    [0, -1],
  ]);

  //static readonly NOT_GATE = new QGate(Math.PI, [1, 0, 0]);
}