import QGate from "../QGate";
import CPList from "../CPList";

type Target = string | HTMLElement | null | undefined;


type Pulse = {
  theta: (_theta: number, _phi: number) => number;
  phi: (_theta: number, _phi: number) => number;
  canReduce?: boolean;
};

export default class QTool {
  static evalGate(pulse: Pulse[], theta: number, phi: number, ple: number, ore: number): QGate {
    let gate = new QGate();
    pulse.map(p => {
      const th = p.theta(theta, phi);
      const ph = p.phi(theta, phi);
      return new QGate(th * (1 + ple), [Math.cos(ph), Math.sin(ph), ore]);
    }).reverse().forEach(g => {
      gate = gate.multiply(g);
    })
    return gate;
  }

  static createCanvas2D(targetId: Target, { width = 400, height = 400 }: { width?: number; height?: number } = {}): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D | null; clearCanvas: () => void } {
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
    }
    return { canvas, ctx, clearCanvas };
  }

  static createErrorList(errorRange: { ple: { min: number; max: number; step: number }; ore: { min: number; max: number; step: number } } = {
    ple: { min: -0.1, max: 0.1, step: 0.001 },
    ore: { min: -0.1, max: 0.1, step: 0.001 },
  }): { ple: number; ore: number }[][] {
    const N = {
      ple: Math.floor((errorRange.ple.max - errorRange.ple.min) / errorRange.ple.step) + 1,
      ore: Math.floor((errorRange.ore.max - errorRange.ore.min) / errorRange.ore.step) + 1,
    }
    const errorList = [];
    for (let i = 0; i < N.ple; i++) {
      const l = [];
      for (let j = 0; j < N.ore; j++) {
        l.push({
          ple: errorRange.ple.min + i * errorRange.ple.step,
          ore: errorRange.ore.min + j * errorRange.ore.step,
        });
      }
      errorList.push(l);
    }
    return errorList;
  }

  static calculateFidelity(
    gateName: string,
    theta: number,
    phi: number,
    error: { ple: { min: number; max: number; step: number }; ore: { min: number; max: number; step: number } } = {
      ple: { min: -0.1, max: 0.1, step: 0.001 },
      ore: { min: -0.1, max: 0.1, step: 0.001 },
    }): { errorList: { ple: number; ore: number }[][]; fidelityList: { fidelity: number; pleIdx: number; oreIdx: number }[] } {
    const CompositeGate = CPList[gateName].pulse;
    const plain = CPList.plain.pulse;

    const idealGate = QTool.evalGate(plain, theta, phi, 0, 0);
    const errorList = QTool.createErrorList(error);

    const fidelityList: { fidelity: number; pleIdx: number; oreIdx: number }[] = [];
    errorList.forEach((row, pleIdx) => {
      row.forEach((error, oreIdx) => {
        const { ple, ore } = error;
        const gate = QTool.evalGate(CompositeGate, theta, phi, ple, ore);
        fidelityList.push({
          fidelity: gate.fidelity(idealGate),
          pleIdx,
          oreIdx,
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
      ple: { min: -0.1, max: 0.1, step: 0.005 },
      ore: { min: -0.1, max: 0.1, step: 0.005 }
    }
  }: {
    target: Target;
    gateName: string;
    theta: number;
    phi: number;
    width: number;
    height: number;
    threshold?: number;
    fillStyle?: (val: number) => string;
    overFill?: number;
    error?: { ple: { min: number; max: number; step: number }; ore: { min: number; max: number; step: number } };
  }) {
    const { errorList, fidelityList } = QTool.calculateFidelity(gateName, theta, phi, error)

    const pleMesh = height / errorList.length;
    const oreMesh = width / errorList[0].length;
    const { canvas, ctx, clearCanvas } = QTool.createCanvas2D(target, { width, height });
    clearCanvas();

    if (ctx) {
      fidelityList.forEach(({ fidelity, pleIdx, oreIdx }) => {
        const colorValue = Math.floor(((Math.max(fidelity, threshold) - threshold) / (1 - threshold)) * 255);
        ctx.fillStyle = fillStyle(colorValue);
        ctx.fillRect(oreIdx * oreMesh - overFill / 2, pleIdx * pleMesh - overFill / 2, oreMesh + overFill, pleMesh + overFill);
      });
    }
  }

  static drawBloch(create: any, {
    ringWeight = 0.01,
    ringNum = { azimuthal: 7, polar: 8 },
    color = {
      sphere: 0x888888,
      ringMain: 0x5555ff,
      ringSub: 0xffffff,
    }
  }: {
    ringWeight?: number;
    ringNum?: { azimuthal: number; polar: number };
    color?: { sphere: number; ringMain: number; ringSub: number };
  } = {}) {
    const Bloch = create.group({
      children: [
        create.sphere({
          option: {
            transparent: true,
            opacity: 0.5,
            color: color.sphere,
          },
          autoAdd: false
        }),
        create.group({
          children:
            new Array(ringNum.polar).fill(0).map((_, i) => {
              create.cylinder({
                size: [1, 1, ringWeight],
                segments: [128, 1],
                rotation: [Math.PI / 2, 0, i * Math.PI / ringNum.polar],
                openEnded: true,
                option: {
                  side: 2,
                  color: (i === 0 || (i === ringNum.polar / 2)) ? color.ringMain : color.ringSub,
                },
                autoAdd: true
              })
            }),
          autoAdd: false
        }),
        create.group({
          children:
            new Array(ringNum.azimuthal).fill(0).map((_, i) => {
              const theta = ((i + 1) / (ringNum.azimuthal + 1)) * Math.PI;
              const r = Math.sin(theta);
              create.cylinder({
                size: [r, r, ringWeight],
                segments: [128, 1],
                position: [0, Math.cos(theta), 0],
                openEnded: true,
                option: {
                  side: 2,
                  color: (ringNum.azimuthal % 2 !== 0 && i === ~~(ringNum.azimuthal / 2)) ? color.ringMain : color.ringSub,
                },
                autoAdd: true
              })
            }),
          autoAdd: false
        })
      ]
    })
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
      directional: { intensity: 0.6, position: [-10, 10, -10] },
    },
    bloch = {
      ringWeight: 0.01,
      ringNum: { azimuthal: 7, polar: 8 },
      color: {
        sphere: 0x888888,
        ringMain: 0x5555ff,
        ringSub: 0xffffff,
      }
    },
    point = {
      size: {
        normal: 0.04,
        errorP: 0.04,
        errorN: 0.04,
      },
      color: {
        normal: 0x7777ff,
        errorP: 0xff7777,
        errorN: 0xffaaaa,
      }
    },
    view = {
      position: [0, 0, -2],
    }
  }: {
    init: any;
    target: Target;
    pulseName: string;
    angle: number;
    phi: number;
    initState: any;
    speed: number;
    draggable?: boolean;
    light?: {
      ambient: { intensity: number };
      directional: { intensity: number; position: [number, number, number] };
    };
    bloch?: {
      ringWeight?: number;
      ringNum?: { azimuthal: number; polar: number };
      color?: { sphere: number; ringMain: number; ringSub: number };
    };
    point?: {
      size?: { normal: number; errorP: number; errorN: number };
      color?: { normal: number; errorP: number; errorN: number };
    };
    view?: { position: [number, number, number] };
  }): {
    create: any;
    camera: any;
    controls: any;
    animate: any;
    helper: any;
    destroy: any;
  } {
    const pulses = CPList[pulseName].pulse.map(p => ({
      theta: p.theta(angle, phi),
      phi: p.phi(angle, phi),
    }));
    let currentState = initState;
    let eState = [
      initState, initState
    ]

    const { create, camera, controls, animate, helper, destroy } = init(target);

    camera.position.set(...view.position);
    if (draggable) {
      controls.connect();
    }

    create.ambientLight({ intensity: light.ambient.intensity });
    const directionalLight = create.directionalLight({
      intensity: light.directional.intensity,
      position: light.directional.position,
    });
    directionalLight.shadow.bias = -0.0001;

    helper.axes({ size: 1 })

    QTool.drawBloch(create, {
      ringWeight: bloch.ringWeight,
      ringNum: bloch.ringNum,
      color: bloch.color,
    });

    const idealPoint = create.sphere({
      size: point?.size?.normal ?? 0.04,
      position: [0, 1, 0],
      option: {
        color: point?.color?.normal ?? 0x7777ff,
      },
    })
    const errorPoint = [
      create.sphere({
        size: point?.size?.errorP ?? 0.04,
        position: [0, 1, 0],
        option: {
          color: point?.color?.errorP ?? 0xff7777,
        },
      }),
      create.sphere({
        size: point?.size?.errorN ?? 0.04,
        position: [0, 1, 0],
        option: {
          color: point?.color?.errorN ?? 0xffaaaa,
        },
      })
    ]


    let mode = 0;
    let counter = 0;
    const waitTime = [1, 2];
    let currentTheta = 0;
    let gateIndex = 0;
    const ple = 0.05, ore = 0.05;
    animate(({ delta }: { delta: number }) => {
      switch (mode) {
        case 0: // wait before start
          counter += delta;
          if (counter >= waitTime[0]) {
            mode = 1;
            counter = 0;
          }
          return;
        case 1: // gate operation
          break;
        case 2: // wait after end
          counter += delta;
          if (counter >= waitTime[1]) {
            mode = 0;
            counter = 0;
            //point.position.set(0, 1, 0);
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
        new QGate((1 - ple) * dTheta, [Math.cos(pulses[gateIndex].phi), Math.sin(pulses[gateIndex].phi), -ore]),
      ]
      currentState = g.apply(currentState);
      eState = eState.map((st, i) => eg[i].apply(st));
      const xyz = currentState.xyz;
      const Exyz = eState.map(st => st.xyz);
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
}
