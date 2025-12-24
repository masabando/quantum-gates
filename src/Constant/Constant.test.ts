import { describe, it, expect } from "vitest";
import Constant from "./index";

describe("Constant Module", () => {
  it("identity matrix is correct", () => {
    const id2 = Constant.identity(2);
    expect(id2.matrix).toEqual([
      [ { realPart: 1, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 1, imaginaryPart: 0 } ],
    ]);

    const id3 = Constant.identity(3);
    expect(id3.matrix).toEqual([
      [ { realPart: 1, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 1, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 }, { realPart: 1, imaginaryPart: 0 } ],
    ]);
  });

  it("zero matrix is correct", () => {
    const zero2 = Constant.zero(2);
    expect(zero2.matrix).toEqual([
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
    ]);

    const zero3 = Constant.zero(3);
    expect(zero3.matrix).toEqual([
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
      [ { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 }, { realPart: 0, imaginaryPart: 0 } ],
    ]);
  });
});
