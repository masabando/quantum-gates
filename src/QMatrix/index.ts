import Complex from "../Complex"

export default class QMatrix {
  matrix: Complex[][];

  constructor(matrix: (number | Complex)[][]) {
    this.matrix = matrix.map(row =>
      row.map(value =>
        value instanceof Complex ? value : new Complex(value, 0)
      )
    );
  }

  get rows(): number {
    return this.matrix.length;
  }
  
  get cols(): number {
    return this.matrix[0].length;
  }

  add(other: QMatrix): QMatrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrices must have the same dimensions for addition");
    }

    const result = this.matrix.map((row, i) =>
      row.map((value, j) => value.add(other.matrix[i][j]))
    );

    return new QMatrix(result);
  }

  multiply(other: QMatrix): QMatrix {
    if (this.cols !== other.rows) {
      throw new Error("Incompatible matrix sizes for multiplication");
    }

    const result: Complex[][] = Array.from({ length: this.rows }, () =>
      Array.from({ length: other.cols }, () => new Complex(0, 0))
    );
    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        for (let k = 0; k < this.cols; k++) {
          result[i][j] = result[i][j].add(this.matrix[i][k].multiply(other.matrix[k][j]));
        }
      }
    }

    return new QMatrix(result);
  }


  toString(digits?: number): string {
    return this.matrix
      .map(row => row.map(value => value.toString(digits)).join("\t"))
      .join("\n");
  }

  scale(scalar: Complex | number): QMatrix {
    const scalarComplex = scalar instanceof Complex ? scalar : new Complex(scalar, 0);
    const result = this.matrix.map(row =>
      row.map(value => value.multiply(scalarComplex))
    );
    return new QMatrix(result);
  }

  conjugate(): QMatrix {
    const result = this.matrix.map(row =>
      row.map(value => value.conjugate())
    );
    return new QMatrix(result);
  }

  transpose(): QMatrix {
    const result: Complex[][] = Array.from({ length: this.cols }, () =>
      Array.from({ length: this.rows }, () => new Complex(0, 0))
    );

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result[j][i] = this.matrix[i][j];
      }
    }

    return new QMatrix(result);
  }

  dagger(): QMatrix {
    return this.conjugate().transpose();
  }

  trace(): Complex {
    let trace = new Complex(0, 0);
    for (let i = 0; i < Math.min(this.rows, this.cols); i++) {
      trace = trace.add(this.matrix[i][i]);
    }
    return trace;
  }

}