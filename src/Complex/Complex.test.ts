import { describe, it, expect } from "vitest";
import Complex from "./index";

describe("Complex Class", () => {
  it("constructs correctly", () => {
    const c = new Complex(3, 4);
    expect(c.realPart).toBe(3);
    expect(c.imaginaryPart).toBe(4);
  });

  it("adds correctly", () => {
    const a = new Complex(1, 2);
    const b = new Complex(5, 9);
    const result = a.add(b);
    expect(result.realPart).toBe(6);
    expect(result.imaginaryPart).toBe(11);
  });

  it("multiplies correctly", () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.multiply(b);
    expect(result.realPart).toBe(-5);
    expect(result.imaginaryPart).toBe(10);
    const c = new Complex(0, 1);
    const d = new Complex(0, -1);
    const result2 = c.multiply(d);
    expect(result2.realPart).toBe(1);
    expect(result2.imaginaryPart).toBe(0);
  });

  it("scales correctly", () => {
    const a = new Complex(2, 3);
    const result = a.scale(3);
    expect(result.realPart).toBe(6);
    expect(result.imaginaryPart).toBe(9);
  });

  it("converts to string correctly", () => {
    const a = new Complex(3, 4);
    expect(a.toString()).toBe("3 + 4i");
    const b = new Complex(-1, -2);
    expect(b.toString()).toBe("-1 + -2i");
    const c = new Complex(1.123456, 2.654321);
    expect(c.toString(2)).toBe("1.12 + 2.65i");
  });

  it("calculates magnitude correctly", () => {
    const a = new Complex(3, 4);
    expect(a.magnitude()).toBe(5);
    const b = new Complex(1, 1);
    expect(b.magnitude()).toBeCloseTo(Math.sqrt(2));
  });

  it("calculates conjugate correctly", () => {
    const a = new Complex(3, 4);
    const result = a.conjugate();
    expect(result.realPart).toBe(3);
    expect(result.imaginaryPart).toBe(-4);
  });
});
