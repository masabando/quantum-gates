type RobustType = "ple" | "ore" | "both";
type Rep = "ple" | "ore" | false;

type Pulse = {
  theta: (_theta: number, _phi: number) => number;
  phi: (_theta: number, _phi: number) => number;
  canReduce?: boolean;
};

type CP = {
  name: string;
  robustType?: RobustType;
  rep?: Rep;
  pulse: Pulse[];
}


const CPList: Record<string, CP> = {
  plain: {
    name: "plain",
    pulse: [
      {
        theta: (_theta: number, _phi: number) => _theta,
        phi: (_theta: number, _phi: number) => _phi
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
        theta: (_theta: number, _phi: number) => Math.PI,
        phi: (_theta: number, _phi: number) => _phi + Math.acos(-_theta / (4 * Math.PI)),
      },
      {
        canReduce: true,
        theta: (_theta: number, _phi: number) => 2 * Math.PI,
        phi: (_theta: number, _phi: number) => 3 * (_phi + Math.acos(-_theta / (4 * Math.PI))) - 2 * _phi,
      },
      {
        canReduce: true,
        theta: (_theta: number, _phi: number) => Math.PI,
        phi: (_theta: number, _phi: number) => _phi + Math.acos(-_theta / (4 * Math.PI)),
      },
      {
        theta: (_theta: number, _phi: number) => _theta,
        phi: (_theta: number, _phi: number) => _phi,
      }
    ]
  },
  SK1: {
    name: "SK1",
    robustType: "ple",
    rep: "ore",
    pulse: [
      {
        theta: (_theta: number, _phi: number) => _theta,
        phi: (_theta: number, _phi: number) => _phi,
      },
      {
        canReduce: true,
        theta: (_theta: number, _phi: number) => 2 * Math.PI,
        phi: (_theta: number, _phi: number) => _phi - Math.acos(-_theta / (4 * Math.PI)),
      },
      {
        canReduce: true,
        theta: (_theta: number, _phi: number) => 2 * Math.PI,
        phi: (_theta: number, _phi: number) => _phi + Math.acos(-_theta / (4 * Math.PI)),
      }
    ]
  },
  CORPSE: {
    name: "CORPSE",
    robustType: "ore",
    rep: "ple",
    pulse: [
      {
        theta: (_theta: number, _phi: number) => 2 * Math.PI + _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta: number, _phi: number) => _phi,
      },
      {
        theta: (_theta: number, _phi: number) => 2 * Math.PI - 2 * Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta: number, _phi: number) => _phi + Math.PI,
      },
      {
        theta: (_theta: number, _phi: number) => _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta: number, _phi: number) => _phi,
      }
    ]
  },
  shortCORPSE: {
    name: "shortCORPSE",
    robustType: "ore",
    rep: false,
    pulse: [
      {
        theta: (_theta: number, _phi: number) => _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta: number, _phi: number) => _phi,
      },
      {
        theta: (_theta: number, _phi: number) => 2 * Math.PI - 2 * Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta: number, _phi: number) => _phi + Math.PI,
      },
      {
        theta: (_theta: number, _phi: number) => _theta / 2 - Math.asin(Math.sin(_theta / 2) / 2),
        phi: (_theta: number, _phi: number) => _phi,
      }
    ]
  },
}

function concatenate(pulseA: string, pulseB: string, reduced: boolean = false): Pulse[] {
  return CPList[pulseB].pulse.map((pulseBElement) => {
    if (reduced && pulseBElement.canReduce) {
      return pulseBElement;
    } else {
      return CPList[pulseA].pulse.map((pulseAElement) => {
        return {
          theta: (_theta: number, _phi: number) => pulseAElement.theta(
            pulseBElement.theta(_theta, _phi),
            pulseBElement.phi(_theta, _phi)
          ),
          phi: (_theta: number, _phi: number) => pulseAElement.phi(
            pulseBElement.theta(_theta, _phi),
            pulseBElement.phi(_theta, _phi)
          ),
        };
      });
    }
  }).flat()
}

function createCCCP(pulseA: string, pulseB: string, reduced: boolean = false): CP {
  return {
    name: `${reduced ? "reduced " : ""}${pulseA}/${pulseB}`,
    robustType: "both",
    rep: false,
    pulse: concatenate(pulseA, pulseB, reduced)
  }
}

CPList["CORPSE/SK1"] = createCCCP("CORPSE", "SK1");
CPList["SK1/CORPSE"] = createCCCP("SK1", "CORPSE");
CPList["CORPSE/BB1"] = createCCCP("CORPSE", "BB1");
CPList["BB1/CORPSE"] = createCCCP("BB1", "CORPSE");
CPList["reduced CORPSE/SK1"] = createCCCP("CORPSE", "SK1", true);
CPList["reduced CORPSE/BB1"] = createCCCP("CORPSE", "BB1", true);


// console.log(CPList);

export default CPList;