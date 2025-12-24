import { describe, it, expect } from "vitest";
import QMatrix from "./index";
import Complex from "../Complex";

describe("QMatrix Class", () => {
  it("constructs correctly", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const qMatrix = new QMatrix(matrix);
    expect(qMatrix.rows).toBe(2);
    expect(qMatrix.cols).toBe(2);
    expect(qMatrix.matrix[0][0].realPart).toBe(1);
    expect(qMatrix.matrix[0][1].realPart).toBe(2);
    expect(qMatrix.matrix[1][0].realPart).toBe(3);
    expect(qMatrix.matrix[1][1].realPart).toBe(4);

    const complexMatrix = [
      [new Complex(1, 1), new Complex(2, 2)],
      [new Complex(3, 3), new Complex(4, 4)],
    ];
    const qMatrix2 = new QMatrix(complexMatrix);
    expect(qMatrix2.rows).toBe(2);
    expect(qMatrix2.cols).toBe(2);
    expect(qMatrix2.matrix[0][0].realPart).toBe(1);
    expect(qMatrix2.matrix[0][0].imaginaryPart).toBe(1);
    expect(qMatrix2.matrix[0][1].realPart).toBe(2);
    expect(qMatrix2.matrix[0][1].imaginaryPart).toBe(2);
    expect(qMatrix2.matrix[1][0].realPart).toBe(3);
    expect(qMatrix2.matrix[1][0].imaginaryPart).toBe(3);
    expect(qMatrix2.matrix[1][1].realPart).toBe(4);
    expect(qMatrix2.matrix[1][1].imaginaryPart).toBe(4);
  });
  
  it("rows and cols properties work correctly", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const qMatrix = new QMatrix(matrix);
    expect(qMatrix.rows).toBe(2);
    expect(qMatrix.cols).toBe(3);
  });
  it("adds correctly", () => {
    const a = new QMatrix([
      [1, 2],
      [3, 4],
    ]);
    const b = new QMatrix([
      [5, 6],
      [7, 8],
    ]);
    const result = a.add(b);
    expect(result.matrix[0][0].realPart).toBe(6);
    expect(result.matrix[0][1].realPart).toBe(8);
    expect(result.matrix[1][0].realPart).toBe(10);
    expect(result.matrix[1][1].realPart).toBe(12);
  });

  it("multiplies correctly", () => {
    const a = new QMatrix([
      [1, 2],
      [3, 4],
    ]);
    const b = new QMatrix([
      [5, 6],
      [7, 8],
    ]);
    const result = a.multiply(b);
    expect(result.matrix[0][0].realPart).toBe(19);
    expect(result.matrix[0][1].realPart).toBe(22);
    expect(result.matrix[1][0].realPart).toBe(43);
    expect(result.matrix[1][1].realPart).toBe(50);
  });

  it("toString works correctly", () => {
    const a = new QMatrix([
      [1, 2],
      [3, 4],
    ]);
    const str = a.toString();
    expect(str).toBe("1 + 0i\t2 + 0i\n3 + 0i\t4 + 0i");
  });
  
  it("scales correctly", () => {
    const a = new QMatrix([
      [1, 2],
      [3, 4],
    ]);
    const result = a.scale(2);
    expect(result.matrix[0][0].realPart).toBe(2);
    expect(result.matrix[0][1].realPart).toBe(4);
    expect(result.matrix[1][0].realPart).toBe(6);
    expect(result.matrix[1][1].realPart).toBe(8);

    const b = new QMatrix([
      [new Complex(1, 1), new Complex(2, 2)],
      [new Complex(3, 3), new Complex(4, 4)],
    ]);
    const scalar = new Complex(2, 0);
    const result2 = b.scale(scalar);
    expect(result2.matrix[0][0].realPart).toBe(2);
    expect(result2.matrix[0][0].imaginaryPart).toBe(2);
    expect(result2.matrix[0][1].realPart).toBe(4);
    expect(result2.matrix[0][1].imaginaryPart).toBe(4);
    expect(result2.matrix[1][0].realPart).toBe(6);
    expect(result2.matrix[1][0].imaginaryPart).toBe(6);
    expect(result2.matrix[1][1].realPart).toBe(8);
    expect(result2.matrix[1][1].imaginaryPart).toBe(8);
  });

  it("conjugates correctly", () => {
    const a = new QMatrix([
      [new Complex(1, 2), new Complex(3, 4)],
      [new Complex(5, 6), new Complex(7, 8)],
    ]);
    const result = a.conjugate();
    expect(result.matrix[0][0].realPart).toBe(1);
    expect(result.matrix[0][0].imaginaryPart).toBe(-2);
    expect(result.matrix[0][1].realPart).toBe(3);
    expect(result.matrix[0][1].imaginaryPart).toBe(-4);
    expect(result.matrix[1][0].realPart).toBe(5);
    expect(result.matrix[1][0].imaginaryPart).toBe(-6);
    expect(result.matrix[1][1].realPart).toBe(7);
    expect(result.matrix[1][1].imaginaryPart).toBe(-8);
  });
  
  it("transposes correctly", () => {
    const a = new QMatrix([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const result = a.transpose();
    expect(result.rows).toBe(3);
    expect(result.cols).toBe(2);
    expect(result.matrix[0][0].realPart).toBe(1);
    expect(result.matrix[0][1].realPart).toBe(4);
    expect(result.matrix[1][0].realPart).toBe(2);
    expect(result.matrix[1][1].realPart).toBe(5);
    expect(result.matrix[2][0].realPart).toBe(3);
    expect(result.matrix[2][1].realPart).toBe(6);
  });

  it("throws error on invalid addition", () => {
    const a = new QMatrix([
      [1, 2],
      [3, 4],
    ]);
    const b = new QMatrix([
      [5, 6, 7],
      [8, 9, 10],
    ]);
    expect(() => a.add(b)).toThrow("Matrices must have the same dimensions for addition");
  });

  it("throws error on invalid multiplication", () => {
    const a = new QMatrix([
      [1, 2],
      [3, 4],
    ]);
    const b = new QMatrix([
      [5, 6],
      [7, 8],
      [9, 10],
    ]);
    expect(() => a.multiply(b)).toThrow("Incompatible matrix sizes for multiplication");
  });

  it("dagger works correctly", () => {
    const a = new QMatrix([
      [new Complex(1, 2), new Complex(3, 4)],
      [new Complex(5, 6), new Complex(7, 8)],
    ]);
    const result = a.dagger();
    expect(result.rows).toBe(2);
    expect(result.cols).toBe(2);
    expect(result.matrix[0][0].realPart).toBe(1);
    expect(result.matrix[0][0].imaginaryPart).toBe(-2);
    expect(result.matrix[0][1].realPart).toBe(5);
    expect(result.matrix[0][1].imaginaryPart).toBe(-6);
    expect(result.matrix[1][0].realPart).toBe(3);
    expect(result.matrix[1][0].imaginaryPart).toBe(-4);
    expect(result.matrix[1][1].realPart).toBe(7);
    expect(result.matrix[1][1].imaginaryPart).toBe(-8);
  });

  it("trace works correctly", () => {
    const a = new QMatrix([
      [new Complex(1, 2), new Complex(3, 4)],
      [new Complex(5, 6), new Complex(7, 8)],
    ]);
    const result = a.trace();
    expect(result.realPart).toBe(8);
    expect(result.imaginaryPart).toBe(10);
  });
});
