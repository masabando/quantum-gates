export default class Complex {
  realPart: number;
  imaginaryPart: number;

  constructor(realPart: number, imaginaryPart: number) {
    this.realPart = realPart;
    this.imaginaryPart = imaginaryPart;
  }

  add(other: Complex): Complex {
    return new Complex(
      this.realPart + other.realPart,
      this.imaginaryPart + other.imaginaryPart
    );
  }

  multiply(other: Complex): Complex {
    return new Complex(
      this.realPart * other.realPart - this.imaginaryPart * other.imaginaryPart,
      this.realPart * other.imaginaryPart + this.imaginaryPart * other.realPart
    );
  }

  scale(scalar: number): Complex {
    return new Complex(this.realPart * scalar, this.imaginaryPart * scalar);
  }

  toString(digits?: number): string {
    if (digits !== undefined) {
      return `${this.realPart.toFixed(digits)} + ${this.imaginaryPart.toFixed(digits)}i`;
    } else {
      return `${this.realPart} + ${this.imaginaryPart}i`;
    }
  }

  magnitude(): number {
    return Math.sqrt(this.realPart ** 2 + this.imaginaryPart ** 2);
  }

  conjugate(): Complex {
    return new Complex(this.realPart, -this.imaginaryPart);
  }
}

