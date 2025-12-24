declare class Complex {
    realPart: number;
    imaginaryPart: number;
    constructor(realPart: number, imaginaryPart: number);
    add(other: Complex): Complex;
    multiply(other: Complex): Complex;
    scale(scalar: number): Complex;
    toString(digits?: number): string;
    magnitude(): number;
    conjugate(): Complex;
}

declare class QMatrix {
    matrix: Complex[][];
    constructor(matrix: (number | Complex)[][]);
    get rows(): number;
    get cols(): number;
    add(other: QMatrix): QMatrix;
    multiply(other: QMatrix): QMatrix;
    toString(digits?: number): string;
    scale(scalar: Complex | number): QMatrix;
    conjugate(): QMatrix;
    transpose(): QMatrix;
    dagger(): QMatrix;
    trace(): Complex;
}

declare class QState {
    vector: Complex[];
    column: boolean;
    constructor(vector: number[] | Complex[], column?: boolean);
    toString(digit: number): string;
    scale(scalar: Complex | number): QState;
    magnitude(): number;
    normalize(): QState;
    transpose(): QState;
    conjugate(): QState;
    dagger(): QState;
    get isColumn(): boolean;
    get values(): Complex[] | Complex[][];
    applyMatrix(matrix: QMatrix): QState;
    applyState(state: QState): Complex;
    get xyz(): {
        x: number;
        y: number;
        z: number;
    };
}

declare class QGate {
    matrix: QMatrix;
    constructor(theta?: number, n?: [number, number, number]);
    setMatrix(matrix: QMatrix): QGate;
    dagger(): QGate;
    conjugate(): QGate;
    transpose(): QGate;
    apply(stateVector: QState): QState;
    multiply(other: QGate): QGate;
    trace(): Complex;
    fidelity(ideal: QGate): number;
}

declare class Constant {
    static readonly PI: number;
    static readonly E: number;
    static readonly IDENTITY_2x2: QMatrix;
    static readonly IDENTITY_3x3: QMatrix;
    static readonly IDENTITY_4x4: QMatrix;
    static readonly identity: (dim: number) => QMatrix;
    static readonly zero: (dim: number) => QMatrix;
    static readonly ZERO_2x2: QMatrix;
    static readonly ZERO_3x3: QMatrix;
    static readonly ZERO_4x4: QMatrix;
    static readonly COMPLEX_I: Complex;
    static readonly COMPLEX_ONE: Complex;
    static readonly COMPLEX_ZERO: Complex;
    static readonly PAULI_X: QMatrix;
    static readonly PAULI_Y: QMatrix;
    static readonly PAULI_Z: QMatrix;
}

type RobustType = "ple" | "ore" | "both";
type Rep = "ple" | "ore" | false;
type Pulse$1 = {
    theta: (_theta: number, _phi: number) => number;
    phi: (_theta: number, _phi: number) => number;
    canReduce?: boolean;
};
type CP = {
    name: string;
    robustType?: RobustType;
    rep?: Rep;
    pulse: Pulse$1[];
};
declare const CPList: Record<string, CP>;

type Target = string | HTMLElement | null | undefined;
type Pulse = {
    theta: (_theta: number, _phi: number) => number;
    phi: (_theta: number, _phi: number) => number;
    canReduce?: boolean;
};
declare class QTool {
    static evalGate(pulse: Pulse[], theta: number, phi: number, ple: number, ore: number): QGate;
    static createCanvas2D(targetId: Target, { width, height }?: {
        width?: number;
        height?: number;
    }): {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D | null;
        clearCanvas: () => void;
    };
    static createErrorList(errorRange?: {
        ple: {
            min: number;
            max: number;
            step: number;
        };
        ore: {
            min: number;
            max: number;
            step: number;
        };
    }): {
        ple: number;
        ore: number;
    }[][];
    static calculateFidelity(gateName: string, theta: number, phi: number, error?: {
        ple: {
            min: number;
            max: number;
            step: number;
        };
        ore: {
            min: number;
            max: number;
            step: number;
        };
    }): {
        errorList: {
            ple: number;
            ore: number;
        }[][];
        fidelityList: {
            fidelity: number;
            pleIdx: number;
            oreIdx: number;
        }[];
    };
    static createFidelityMap({ target, gateName, theta, phi, width, height, threshold, fillStyle, overFill, error }: {
        target: Target;
        gateName: string;
        theta: number;
        phi: number;
        width: number;
        height: number;
        threshold?: number;
        fillStyle?: (val: number) => string;
        overFill?: number;
        error?: {
            ple: {
                min: number;
                max: number;
                step: number;
            };
            ore: {
                min: number;
                max: number;
                step: number;
            };
        };
    }): void;
    static drawBloch(create: any, { ringWeight, ringNum, color }?: {
        ringWeight?: number;
        ringNum?: {
            azimuthal: number;
            polar: number;
        };
        color?: {
            sphere: number;
            ringMain: number;
            ringSub: number;
        };
    }): void;
    static createAnimation({ init, target, pulseName, angle, phi, initState, speed, draggable, light, bloch, point, view }: {
        init: any;
        target: Target;
        pulseName: string;
        angle: number;
        phi: number;
        initState: any;
        speed: number;
        draggable?: boolean;
        light?: {
            ambient: {
                intensity: number;
            };
            directional: {
                intensity: number;
                position: [number, number, number];
            };
        };
        bloch?: {
            ringWeight?: number;
            ringNum?: {
                azimuthal: number;
                polar: number;
            };
            color?: {
                sphere: number;
                ringMain: number;
                ringSub: number;
            };
        };
        point?: {
            size?: {
                normal: number;
                errorP: number;
                errorN: number;
            };
            color?: {
                normal: number;
                errorP: number;
                errorN: number;
            };
        };
        view?: {
            position: [number, number, number];
        };
    }): {
        create: any;
        camera: any;
        controls: any;
        animate: any;
        helper: any;
        destroy: any;
    };
}

export { CPList, Complex, Constant, QGate, QMatrix, QState, QTool };
