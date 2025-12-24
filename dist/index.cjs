'use strict';

// src/Complex/index.ts
var Complex = class _Complex {
  constructor(realPart, imaginaryPart) {
    this.realPart = realPart;
    this.imaginaryPart = imaginaryPart;
  }
  add(other) {
    return new _Complex(
      this.realPart + other.realPart,
      this.imaginaryPart + other.imaginaryPart
    );
  }
  multiply(other) {
    return new _Complex(
      this.realPart * other.realPart - this.imaginaryPart * other.imaginaryPart,
      this.realPart * other.imaginaryPart + this.imaginaryPart * other.realPart
    );
  }
  scale(scalar) {
    return new _Complex(this.realPart * scalar, this.imaginaryPart * scalar);
  }
  toString(digits) {
    if (digits !== void 0) {
      return `${this.realPart.toFixed(digits)} + ${this.imaginaryPart.toFixed(digits)}i`;
    } else {
      return `${this.realPart} + ${this.imaginaryPart}i`;
    }
  }
  magnitude() {
    return Math.sqrt(this.realPart ** 2 + this.imaginaryPart ** 2);
  }
  conjugate() {
    return new _Complex(this.realPart, -this.imaginaryPart);
  }
};

// src/QMatrix/index.ts
var QMatrix = class _QMatrix {
  constructor(matrix) {
    this.matrix = matrix.map(
      (row) => row.map(
        (value) => value instanceof Complex ? value : new Complex(value, 0)
      )
    );
  }
  get rows() {
    return this.matrix.length;
  }
  get cols() {
    return this.matrix[0].length;
  }
  add(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrices must have the same dimensions for addition");
    }
    const result = this.matrix.map(
      (row, i) => row.map((value, j) => value.add(other.matrix[i][j]))
    );
    return new _QMatrix(result);
  }
  multiply(other) {
    if (this.cols !== other.rows) {
      throw new Error("Incompatible matrix sizes for multiplication");
    }
    const result = Array.from(
      { length: this.rows },
      () => Array.from({ length: other.cols }, () => new Complex(0, 0))
    );
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        for (let k = 0; k < this.cols; k++) {
          result[i][j] = result[i][j].add(this.matrix[i][k].multiply(other.matrix[k][j]));
        }
      }
    }
    return new _QMatrix(result);
  }
  toString(digits) {
    return this.matrix.map((row) => row.map((value) => value.toString(digits)).join("	")).join("\n");
  }
  scale(scalar) {
    const scalarComplex = scalar instanceof Complex ? scalar : new Complex(scalar, 0);
    const result = this.matrix.map(
      (row) => row.map((value) => value.multiply(scalarComplex))
    );
    return new _QMatrix(result);
  }
  conjugate() {
    const result = this.matrix.map(
      (row) => row.map((value) => value.conjugate())
    );
    return new _QMatrix(result);
  }
  transpose() {
    const result = Array.from(
      { length: this.cols },
      () => Array.from({ length: this.rows }, () => new Complex(0, 0))
    );
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result[j][i] = this.matrix[i][j];
      }
    }
    return new _QMatrix(result);
  }
  dagger() {
    return this.conjugate().transpose();
  }
  trace() {
    let trace = new Complex(0, 0);
    for (let i = 0; i < Math.min(this.rows, this.cols); i++) {
      trace = trace.add(this.matrix[i][i]);
    }
    return trace;
  }
};

// src/Constant/index.ts
var Constant = class {
  //static readonly NOT_GATE = new QGate(Math.PI, [1, 0, 0]);
};
Constant.PI = Math.PI;
Constant.E = Math.E;
// identity matrix for 2x2
Constant.IDENTITY_2x2 = new QMatrix([
  [1, 0],
  [0, 1]
]);
// identity matrix for 3x3
Constant.IDENTITY_3x3 = new QMatrix([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]);
// identity matrix for 4x4
Constant.IDENTITY_4x4 = new QMatrix([
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
]);
Constant.identity = (dim) => {
  return new QMatrix(
    Array.from(
      { length: dim },
      (_, i) => Array.from({ length: dim }, (_2, j) => i === j ? 1 : 0)
    )
  );
};
Constant.zero = (dim) => {
  return new QMatrix(
    Array.from(
      { length: dim },
      () => Array.from({ length: dim }, () => 0)
    )
  );
};
// zero matrix for 2x2
Constant.ZERO_2x2 = new QMatrix([
  [0, 0],
  [0, 0]
]);
// zero matrix for 3x3
Constant.ZERO_3x3 = new QMatrix([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);
// zero matrix for 4x4
Constant.ZERO_4x4 = new QMatrix([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
// common complex numbers
Constant.COMPLEX_I = new Complex(0, 1);
Constant.COMPLEX_ONE = new Complex(1, 0);
Constant.COMPLEX_ZERO = new Complex(0, 0);
// pauli matrices
Constant.PAULI_X = new QMatrix([
  [0, 1],
  [1, 0]
]);
Constant.PAULI_Y = new QMatrix([
  [new Complex(0, 0), new Complex(0, -1)],
  [new Complex(0, 1), new Complex(0, 0)]
]);
Constant.PAULI_Z = new QMatrix([
  [1, 0],
  [0, -1]
]);

// src/QState/index.ts
var QState = class _QState {
  constructor(vector, column = true) {
    this.column = true;
    this.column = column;
    this.vector = vector.map(
      (value) => value instanceof Complex ? value : new Complex(value, 0)
    );
  }
  toString(digit) {
    return `[${this.vector.map((value) => value.toString(digit)).join(this.column ? "\n" : ", ")}]`;
  }
  scale(scalar) {
    const factor = scalar instanceof Complex ? scalar : new Complex(scalar, 0);
    const scaledVector = this.vector.map((value) => value.multiply(factor));
    return new _QState(scaledVector, this.column);
  }
  magnitude() {
    let sum = 0;
    for (const value of this.vector) {
      sum += value.magnitude() ** 2;
    }
    return Math.sqrt(sum);
  }
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return this.scale(1 / mag);
  }
  transpose() {
    return new _QState(this.vector, !this.column);
  }
  conjugate() {
    const conjugatedVector = this.vector.map((value) => value.conjugate());
    return new _QState(conjugatedVector, this.column);
  }
  dagger() {
    return this.conjugate().transpose();
  }
  get isColumn() {
    return this.column;
  }
  get values() {
    return this.vector;
  }
  applyMatrix(matrix) {
    if (this.column) {
      throw new Error("Matrix application is only defined for row vectors");
    }
    if (matrix.cols !== this.vector.length) {
      throw new Error("Incompatible sizes for matrix application");
    }
    const result = Array.from({ length: matrix.rows }, () => new Complex(0, 0));
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        result[i] = result[i].add(matrix.matrix[j][i].multiply(this.vector[j]));
      }
    }
    return new _QState(result, false);
  }
  // <v1|v2>
  applyState(state) {
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
  get xyz() {
    if (!this.column) {
      throw new Error("State vector must be a column vector to compute xyz coordinates");
    }
    const dagger = this.dagger();
    const x = dagger.applyMatrix(Constant.PAULI_X).applyState(this).realPart;
    const y = dagger.applyMatrix(Constant.PAULI_Y).applyState(this).realPart;
    const z = dagger.applyMatrix(Constant.PAULI_Z).applyState(this).realPart;
    return { x, y, z };
  }
};

// src/QGate/index.ts
var QGate = class _QGate {
  constructor(theta = 0, n = [1, 0, 0]) {
    const [nx, ny, nz] = n;
    const magnitude = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (magnitude === 0) {
      throw new Error("Rotation axis vector cannot be zero");
    }
    const [ux, uy, uz] = [nx / magnitude, ny / magnitude, nz / magnitude];
    const cos = Math.cos(theta / 2);
    const sin = -Math.sin(theta / 2);
    const realPart = Constant.IDENTITY_2x2.scale(new Complex(cos, 0));
    const imaginaryPartX = Constant.PAULI_X.scale(new Complex(0, ux * sin));
    const imaginaryPartY = Constant.PAULI_Y.scale(new Complex(0, uy * sin));
    const imaginaryPartZ = Constant.PAULI_Z.scale(new Complex(0, uz * sin));
    this.matrix = realPart.add(imaginaryPartX).add(imaginaryPartY).add(imaginaryPartZ);
  }
  setMatrix(matrix) {
    this.matrix = matrix;
    return this;
  }
  dagger() {
    const m = this.matrix.dagger();
    const gate = new _QGate(0, [1, 0, 0]);
    gate.setMatrix(m);
    return gate;
  }
  conjugate() {
    const m = this.matrix.conjugate();
    const gate = new _QGate(0, [1, 0, 0]);
    gate.setMatrix(m);
    return gate;
  }
  transpose() {
    const m = this.matrix.transpose();
    const gate = new _QGate(0, [1, 0, 0]);
    gate.setMatrix(m);
    return gate;
  }
  apply(stateVector) {
    const resultVector = new Array(this.matrix.rows).fill(new Complex(0, 0));
    for (let i = 0; i < this.matrix.rows; i++) {
      for (let j = 0; j < this.matrix.cols; j++) {
        resultVector[i] = resultVector[i].add(
          this.matrix.matrix[i][j].multiply(stateVector.vector[j])
        );
      }
    }
    return new QState(resultVector);
  }
  multiply(other) {
    const m = this.matrix.multiply(other.matrix);
    const gate = new _QGate(0, [1, 0, 0]);
    gate.setMatrix(m);
    return gate;
  }
  trace() {
    return this.matrix.trace();
  }
  fidelity(ideal) {
    const dim = this.matrix.rows;
    const product = this.matrix.dagger().multiply(ideal.matrix);
    const trace = product.trace();
    const fidelity = trace.magnitude() / dim;
    return fidelity;
  }
};

// src/CPList/index.ts
var CPList = {
  plain: {
    name: "plain",
    pulse: [
      {
        theta: (_theta, _phi) => _theta,
        phi: (_theta, _phi) => _phi
      }
    ]
  },
  BB1: {
    name: "BB1",
    robustType: "ple",
    rep: "ore",
    pulse: [
      {
        canReduce: true,
        theta: (_theta, _phi) => Math.PI,
        phi: (_theta, _phi) => _phi + Math.acos(-_theta / (4 * Math.PI))
      },
      {
        canReduce: true,
        theta: (_theta, _phi) => 2 * Math.PI,
        phi: (_theta, _phi) => 3 * (_phi + Math.acos(-_theta / (4 * Math.PI))) - 2 * _phi
      },
      {
        canReduce: true,
        theta: (_theta, _phi) => Math.PI,
        phi: (_theta, _phi) => _phi + Math.acos(-_theta / (4 * Math.PI))
      },
      {
        theta: (_theta, _phi) => _theta,
        phi: (_theta, _phi) => _phi
      }
    ]
  },
  SK1: {
    name: "SK1",
    robustType: "ple",
    rep: "ore",
    pulse: [
      {
        theta: (_theta, _phi) => _theta,
        phi: (_theta, _phi) => _phi
      },
      {
        canReduce: true,
        theta: (_theta, _phi) => 2 * Math.PI,
        phi: (_theta, _phi) => _phi - Math.acos(-_theta / (4 * Math.PI))
      },
      {
        canReduce: true,
        theta: (_theta, _phi) => 2 * Math.PI,
        phi: (_theta, _phi) => _phi + Math.acos(-_theta / (4 * Math.PI))
      }
    ]
  },
  CORPSE: {
    name: "CORPSE",
    robustType: "ore",
    rep: "ple",
    pulse: [
      {
        theta: (_theta, _phi) => 2 * Math.PI + _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta, _phi) => _phi
      },
      {
        theta: (_theta, _phi) => 2 * Math.PI - 2 * Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta, _phi) => _phi + Math.PI
      },
      {
        theta: (_theta, _phi) => _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta, _phi) => _phi
      }
    ]
  },
  shortCORPSE: {
    name: "shortCORPSE",
    robustType: "ore",
    rep: false,
    pulse: [
      {
        theta: (_theta, _phi) => _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta, _phi) => _phi
      },
      {
        theta: (_theta, _phi) => 2 * Math.PI - 2 * Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta, _phi) => _phi + Math.PI
      },
      {
        theta: (_theta, _phi) => _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta, _phi) => _phi
      }
    ]
  }
};
function concatenate(pulseA, pulseB, reduced = false) {
  return CPList[pulseB].pulse.map((pulseBElement) => {
    if (reduced && pulseBElement.canReduce) {
      return pulseBElement;
    } else {
      return CPList[pulseA].pulse.map((pulseAElement) => {
        return {
          theta: (_theta, _phi) => pulseAElement.theta(
            pulseBElement.theta(_theta, _phi),
            pulseBElement.phi(_theta, _phi)
          ),
          phi: (_theta, _phi) => pulseAElement.phi(
            pulseBElement.theta(_theta, _phi),
            pulseBElement.phi(_theta, _phi)
          )
        };
      });
    }
  }).flat();
}
function createCCCP(pulseA, pulseB, reduced = false) {
  return {
    name: `${reduced ? "reduced " : ""}${pulseA}/${pulseB}`,
    robustType: "both",
    rep: false,
    pulse: concatenate(pulseA, pulseB, reduced)
  };
}
CPList["CORPSE/SK1"] = createCCCP("CORPSE", "SK1");
CPList["SK1/CORPSE"] = createCCCP("SK1", "CORPSE");
CPList["CORPSE/BB1"] = createCCCP("CORPSE", "BB1");
CPList["BB1/CORPSE"] = createCCCP("BB1", "CORPSE");
CPList["reduced CORPSE/SK1"] = createCCCP("CORPSE", "SK1", true);
CPList["reduced CORPSE/BB1"] = createCCCP("CORPSE", "BB1", true);
var CPList_default = CPList;

// src/QTool/index.ts
var QTool = class _QTool {
  static evalGate(pulse, theta, phi, ple, ore) {
    let gate = new QGate();
    pulse.map((p) => {
      const th = p.theta(theta, phi);
      const ph = p.phi(theta, phi);
      return new QGate(th * (1 + ple), [Math.cos(ph), Math.sin(ph), ore]);
    }).reverse().forEach((g) => {
      gate = gate.multiply(g);
    });
    return gate;
  }
  static createCanvas2D(targetId, { width = 400, height = 400 } = {}) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.aspectRatio = (width / height).toString();
    canvas.style.maxWidth = "100%";
    const t = typeof targetId === "string" ? document.querySelector(`${targetId}`) : targetId;
    if (!t) {
      throw new Error(`Target element with id "${targetId}" not found.`);
    }
    t.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const clearCanvas = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    };
    return { canvas, ctx, clearCanvas };
  }
  static createErrorList(errorRange = {
    ple: { min: -0.1, max: 0.1, step: 1e-3 },
    ore: { min: -0.1, max: 0.1, step: 1e-3 }
  }) {
    const N = {
      ple: Math.floor((errorRange.ple.max - errorRange.ple.min) / errorRange.ple.step) + 1,
      ore: Math.floor((errorRange.ore.max - errorRange.ore.min) / errorRange.ore.step) + 1
    };
    const errorList = [];
    for (let i = 0; i < N.ple; i++) {
      const l = [];
      for (let j = 0; j < N.ore; j++) {
        l.push({
          ple: errorRange.ple.min + i * errorRange.ple.step,
          ore: errorRange.ore.min + j * errorRange.ore.step
        });
      }
      errorList.push(l);
    }
    return errorList;
  }
  static calculateFidelity(gateName, theta, phi, error = {
    ple: { min: -0.1, max: 0.1, step: 1e-3 },
    ore: { min: -0.1, max: 0.1, step: 1e-3 }
  }) {
    const CompositeGate = CPList_default[gateName].pulse;
    const plain = CPList_default.plain.pulse;
    const idealGate = _QTool.evalGate(plain, theta, phi, 0, 0);
    const errorList = _QTool.createErrorList(error);
    const fidelityList = [];
    errorList.forEach((row, pleIdx) => {
      row.forEach((error2, oreIdx) => {
        const { ple, ore } = error2;
        const gate = _QTool.evalGate(CompositeGate, theta, phi, ple, ore);
        fidelityList.push({
          fidelity: gate.fidelity(idealGate),
          pleIdx,
          oreIdx
        });
      });
    });
    return { errorList, fidelityList };
  }
  static createFidelityMap({
    target,
    gateName,
    theta,
    phi,
    width,
    height,
    threshold = 0.9999,
    fillStyle = (val) => `rgb(${val}, ${val}, ${val})`,
    overFill = 1,
    error = {
      ple: { min: -0.1, max: 0.1, step: 5e-3 },
      ore: { min: -0.1, max: 0.1, step: 5e-3 }
    }
  }) {
    const { errorList, fidelityList } = _QTool.calculateFidelity(gateName, theta, phi, error);
    const pleMesh = height / errorList.length;
    const oreMesh = width / errorList[0].length;
    const { canvas, ctx, clearCanvas } = _QTool.createCanvas2D(target, { width, height });
    clearCanvas();
    if (ctx) {
      fidelityList.forEach(({ fidelity, pleIdx, oreIdx }) => {
        const colorValue = Math.floor((Math.max(fidelity, threshold) - threshold) / (1 - threshold) * 255);
        ctx.fillStyle = fillStyle(colorValue);
        ctx.fillRect(oreIdx * oreMesh - overFill / 2, pleIdx * pleMesh - overFill / 2, oreMesh + overFill, pleMesh + overFill);
      });
    }
  }
  static drawBloch(create, {
    ringWeight = 0.01,
    ringNum = { azimuthal: 7, polar: 8 },
    color = {
      sphere: 8947848,
      ringMain: 5592575,
      ringSub: 16777215
    }
  } = {}) {
    create.group({
      children: [
        create.sphere({
          option: {
            transparent: true,
            opacity: 0.5,
            color: color.sphere
          },
          autoAdd: false
        }),
        create.group({
          children: new Array(ringNum.polar).fill(0).map((_, i) => {
            create.cylinder({
              size: [1, 1, ringWeight],
              segments: [128, 1],
              rotation: [Math.PI / 2, 0, i * Math.PI / ringNum.polar],
              openEnded: true,
              option: {
                side: 2,
                color: i === 0 || i === ringNum.polar / 2 ? color.ringMain : color.ringSub
              },
              autoAdd: true
            });
          }),
          autoAdd: false
        }),
        create.group({
          children: new Array(ringNum.azimuthal).fill(0).map((_, i) => {
            const theta = (i + 1) / (ringNum.azimuthal + 1) * Math.PI;
            const r = Math.sin(theta);
            create.cylinder({
              size: [r, r, ringWeight],
              segments: [128, 1],
              position: [0, Math.cos(theta), 0],
              openEnded: true,
              option: {
                side: 2,
                color: ringNum.azimuthal % 2 !== 0 && i === ~~(ringNum.azimuthal / 2) ? color.ringMain : color.ringSub
              },
              autoAdd: true
            });
          }),
          autoAdd: false
        })
      ]
    });
  }
  static createAnimation({
    init,
    target,
    pulseName,
    angle,
    phi,
    initState,
    speed,
    draggable = true,
    light = {
      ambient: { intensity: 0.4 },
      directional: { intensity: 0.6, position: [-10, 10, -10] }
    },
    bloch = {
      ringWeight: 0.01,
      ringNum: { azimuthal: 7, polar: 8 },
      color: {
        sphere: 8947848,
        ringMain: 5592575,
        ringSub: 16777215
      }
    },
    point = {
      size: {
        normal: 0.04,
        errorP: 0.04,
        errorN: 0.04
      },
      color: {
        normal: 7829503,
        errorP: 16742263,
        errorN: 16755370
      }
    },
    view = {
      position: [0, 0, -2]
    }
  }) {
    const pulses = CPList_default[pulseName].pulse.map((p) => ({
      theta: p.theta(angle, phi),
      phi: p.phi(angle, phi)
    }));
    let currentState = initState;
    let eState = [
      initState,
      initState
    ];
    const { create, camera, controls, animate, helper, destroy } = init(target);
    camera.position.set(...view.position);
    if (draggable) {
      controls.connect();
    }
    create.ambientLight({ intensity: light.ambient.intensity });
    const directionalLight = create.directionalLight({
      intensity: light.directional.intensity,
      position: light.directional.position
    });
    directionalLight.shadow.bias = -1e-4;
    helper.axes({ size: 1 });
    _QTool.drawBloch(create, {
      ringWeight: bloch.ringWeight,
      ringNum: bloch.ringNum,
      color: bloch.color
    });
    const idealPoint = create.sphere({
      size: point?.size?.normal ?? 0.04,
      position: [0, 1, 0],
      option: {
        color: point?.color?.normal ?? 7829503
      }
    });
    const errorPoint = [
      create.sphere({
        size: point?.size?.errorP ?? 0.04,
        position: [0, 1, 0],
        option: {
          color: point?.color?.errorP ?? 16742263
        }
      }),
      create.sphere({
        size: point?.size?.errorN ?? 0.04,
        position: [0, 1, 0],
        option: {
          color: point?.color?.errorN ?? 16755370
        }
      })
    ];
    let mode = 0;
    let counter = 0;
    const waitTime = [1, 2];
    let currentTheta = 0;
    let gateIndex = 0;
    const ple = 0.05, ore = 0.05;
    animate(({ delta }) => {
      switch (mode) {
        case 0:
          counter += delta;
          if (counter >= waitTime[0]) {
            mode = 1;
            counter = 0;
          }
          return;
        case 1:
          break;
        case 2:
          counter += delta;
          if (counter >= waitTime[1]) {
            mode = 0;
            counter = 0;
            currentState = initState;
          }
          return;
      }
      let dTheta = delta * speed;
      let flag = false;
      if (currentTheta + dTheta > pulses[gateIndex].theta) {
        dTheta = pulses[gateIndex].theta - currentTheta;
        flag = true;
      }
      const g = new QGate(dTheta, [Math.cos(pulses[gateIndex].phi), Math.sin(pulses[gateIndex].phi), 0]);
      const eg = [
        new QGate((1 + ple) * dTheta, [Math.cos(pulses[gateIndex].phi), Math.sin(pulses[gateIndex].phi), ore]),
        new QGate((1 - ple) * dTheta, [Math.cos(pulses[gateIndex].phi), Math.sin(pulses[gateIndex].phi), -ore])
      ];
      currentState = g.apply(currentState);
      eState = eState.map((st, i) => eg[i].apply(st));
      const xyz = currentState.xyz;
      const Exyz = eState.map((st) => st.xyz);
      idealPoint.position.set(xyz.x, xyz.z, xyz.y);
      errorPoint[0].position.set(Exyz[0].x, Exyz[0].z, Exyz[0].y);
      errorPoint[1].position.set(Exyz[1].x, Exyz[1].z, Exyz[1].y);
      currentTheta += dTheta;
      if (flag) {
        gateIndex++;
        currentTheta = 0;
        if (gateIndex >= pulses.length) {
          gateIndex = 0;
          currentState = initState;
          eState = [initState, initState];
          mode = 2;
        }
      }
    });
    return { create, camera, controls, animate, helper, destroy };
  }
};

exports.CPList = CPList_default;
exports.Complex = Complex;
exports.Constant = Constant;
exports.QGate = QGate;
exports.QMatrix = QMatrix;
exports.QState = QState;
exports.QTool = QTool;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map