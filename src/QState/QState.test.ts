import { describe, it, expect } from "vitest";
import QState from "./index";
import Complex from "../Complex";
import QMatrix from "../QMatrix";
import Constant from "../Constant";

describe("QState Class", () => {

  it("constructs correctly", () => {
    const qstate = new QState([1, 0]);
    expect(qstate.values.length).toBe(2);
    expect((qstate.values[0] as Complex).realPart).toBe(1);
    expect((qstate.values[0] as Complex).imaginaryPart).toBe(0);
    expect((qstate.values[1] as Complex).realPart).toBe(0);
    expect((qstate.values[1] as Complex).imaginaryPart).toBe(0);

    const qstate2 = new QState([new Complex(1, 2), new Complex(3, 4)], true);
    expect(qstate2.values.length).toBe(2);
    expect((qstate2.values[0] as Complex).realPart).toBe(1);
    expect((qstate2.values[0] as Complex).imaginaryPart).toBe(2);
    expect((qstate2.values[1] as Complex).realPart).toBe(3);
    expect((qstate2.values[1] as Complex).imaginaryPart).toBe(4);
  });

  it("isColumn property works correctly", () => {
    const qstate = new QState([1, 0], true);
    expect(qstate.isColumn).toBe(true);

    const qstate2 = new QState([1, 0], false);
    expect(qstate2.isColumn).toBe(false);
  });

  it("toString works correctly", () => {
    const qstate = new QState([1, 0], true);
    expect(qstate.toString()).toBe("[1 + 0i\n0 + 0i]");

    const qstate2 = new QState([1, 0], false);
    expect(qstate2.toString()).toBe("[1 + 0i, 0 + 0i]");
  });

  it("magnitude works correctly", () => {
    const state = new QState([3, 4]);
    expect(state.magnitude()).toBe(5);

    const state2 = new QState([new Complex(1, 1), new Complex(1, 1)]);
    expect(state2.magnitude()).toBeCloseTo(2);
  });

  it("normalize works correctly", () => {
    const state = new QState([3, 4]);
    const normalized = state.normalize();
    expect(normalized.magnitude()).toBeCloseTo(1);

    const state2 = new QState([new Complex(1, 1), new Complex(1, 1)]);
    const normalized2 = state2.normalize();
    expect(normalized2.magnitude()).toBeCloseTo(1);
  });

  it("scale works correctly", () => {
    const state = new QState([1, 2]);
    const scaled = state.scale(3);
    expect((scaled.values[0] as Complex).realPart).toBe(3);
    expect((scaled.values[1] as Complex).realPart).toBe(6);
  });
  it("scale with Complex works correctly", () => {
    const state = new QState([new Complex(1, 1), new Complex(2, 2)]);
    const scalar = new Complex(2, 0);
    const scaled = state.scale(scalar);
    expect((scaled.values[0] as Complex).realPart).toBe(2);
    expect((scaled.values[0] as Complex).imaginaryPart).toBe(2);
    expect((scaled.values[1] as Complex).realPart).toBe(4);
    expect((scaled.values[1] as Complex).imaginaryPart).toBe(4);
  });

  it("conjugate works correctly", () => {
    const state = new QState([new Complex(1, 2), new Complex(3, 4)]);
    const conjugated = state.conjugate();
    expect((conjugated.values[0] as Complex).realPart).toBe(1);
    expect((conjugated.values[0] as Complex).imaginaryPart).toBe(-2);
    expect((conjugated.values[1] as Complex).realPart).toBe(3);
    expect((conjugated.values[1] as Complex).imaginaryPart).toBe(-4);
  });

  it("transpose works correctly", () => {
    const state = new QState([1, 2], true);
    const transposed = state.transpose();
    expect(transposed.isColumn).toBe(false);
    expect((transposed.values[0] as Complex).realPart).toBe(1);
    expect((transposed.values[1] as Complex).realPart).toBe(2);
  });

  it("dagger works correctly", () => {
    const state = new QState([new Complex(1, 2), new Complex(3, 4)], true);
    const daggered = state.dagger();
    expect(daggered.isColumn).toBe(false);
    expect((daggered.values[0] as Complex).realPart).toBe(1);
    expect((daggered.values[0] as Complex).imaginaryPart).toBe(-2);
    expect((daggered.values[1] as Complex).realPart).toBe(3);
    expect((daggered.values[1] as Complex).imaginaryPart).toBe(-4);
  });

  it("throws error when normalizing zero vector", () => {
    const zeroState = new QState([0, 0]);
    expect(() => zeroState.normalize()).toThrow("Cannot normalize a zero vector");
  });

  it("applyMatrix works correctly", () => {
    const state = new QState([1, 0], false);
    const matrix = new QMatrix([
      [1, 0],
      [0, 1],
    ]);
    const result = state.applyMatrix(matrix);
    expect((result.values[0] as Complex).realPart).toBe(1);
    expect((result.values[1] as Complex).realPart).toBe(0);
  });

  it("throws error on invalid applyMatrix", () => {
    const state = new QState([1, 0], false);
    const invalidMatrix = new QMatrix([
      [1, 0, 0],
      [0, 1, 0],
    ]);
    expect(() => state.applyMatrix(invalidMatrix)).toThrow("Incompatible sizes for matrix application");
  });

  it("throws error on invalid applyMatrix", () => {
    const state = new QState([1, 0]);
    const invalidMatrix = new QMatrix([
      [1, 0, 0],
      [0, 1, 0],
    ]);
    expect(() => state.applyMatrix(invalidMatrix)).toThrow("Matrix application is only defined for row vectors");
  });

  it("applyState works correctly", () => {
    const bra = new QState([new Complex(1, 0), new Complex(0, 0)], false);
    const ket = new QState([new Complex(1, 0), new Complex(0, 0)], true);
    const result = bra.applyState(ket);
    expect(result.realPart).toBe(1);
    expect(result.imaginaryPart).toBe(0);
  });

  it("throws error on invalid applyState", () => {
    const bra = new QState([1, 0], true);
    const ket = new QState([1, 0], true);
    expect(() => bra.applyState(ket)).toThrow("Incompatible sizes for state application");
  });

  it("throws error on invalid applyState", () => {
    const bra = new QState([1, 0], false);
    const ket = new QState([1, 0, 1], true);
    expect(() => bra.applyState(ket)).toThrow("State vectors must be of the same length for application");
  });

  it("xyz works correctly", () => {
    const state = new QState([1, 0]);
    const xyz = state.xyz;
    expect(xyz.x).toBe(0);
    expect(xyz.y).toBe(0);
    expect(xyz.z).toBe(1);

    const state2 = new QState([0, 1]);
    const xyz2 = state2.xyz;
    expect(xyz2.x).toBe(0);
    expect(xyz2.y).toBe(0);
    expect(xyz2.z).toBe(-1);

    const state3 = new QState([1 / Math.sqrt(2), 1 / Math.sqrt(2)]);
    const xyz3 = state3.xyz;
    expect(xyz3.x).toBeCloseTo(1);
    expect(xyz3.y).toBeCloseTo(0);
    expect(xyz3.z).toBeCloseTo(0);

    const state4 = new QState([new Complex(1, 0), new Complex(0, 1)]).normalize();
    const xyz4 = state4.xyz;
    expect(xyz4.x).toBeCloseTo(0);
    expect(xyz4.y).toBeCloseTo(1);
    expect(xyz4.z).toBeCloseTo(0);
  });

  it("throws error on invalid xyz", () => {
    const state = new QState([1, 0], false);
    expect(() => state.xyz).toThrow("State vector must be a column vector to compute xyz coordinates");
  });

});
