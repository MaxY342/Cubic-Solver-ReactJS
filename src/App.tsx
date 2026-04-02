import { useState, useMemo } from "react";
import { CubicInput } from "./components/CubicInput";
import { CubicEquation } from "./components/CubicEquation";
import { CubicTable } from "./components/CubicTable";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";
import { type Equation } from "./types";

export const App = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [savedEquations, setSavedEquations] = useState<Equation[]>([]);

  const computed = useMemo(() => {
    if (a && a !== "0") {
      const aNum = Number(a);
      const bNum = Number(b);
      const cNum = Number(c);
      const dNum = Number(d);

      const p = (3 * aNum * cNum - bNum * bNum) / (3 * aNum * aNum);
      const q =
        (2 * bNum ** 3 - 9 * aNum * bNum * cNum + 27 * aNum ** 2 * dNum) /
        (27 * aNum ** 3);
      const discriminant = (q * q) / 4 + (p * p * p) / 27;
      const eps = 1e-10;

      let firstRoot = "";
      let firstRootY = "";
      let secondRoot = "";
      let secondRootY = "";
      let thirdRoot = "";
      let thirdRootY = "";

      const equation = `
        ${aNum == 0 ? "" : String(aNum) + "x\u00b3"} 
        ${bNum == 0 ? "" : bNum < 0 ? "- " + String(Math.abs(bNum)) + "x\u00b2" : "+ " + String(Math.abs(bNum)) + "x\u00b2"} 
        ${cNum == 0 ? "" : cNum < 0 ? "- " + String(Math.abs(cNum)) + "x" : "+ " + String(Math.abs(cNum)) + "x"} 
        ${dNum == 0 ? "" : dNum < 0 ? "- " + String(Math.abs(dNum)) : "+ " + String(Math.abs(dNum))}`;

      if (discriminant < -eps) {
        const theta =
          (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-(p * p * p) / 27)));
        const root1 =
          2 * Math.sqrt(-p / 3) * Math.cos(theta) - bNum / (3 * aNum);
        const root2 =
          2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) -
          bNum / (3 * aNum);
        const root3 =
          2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) -
          bNum / (3 * aNum);
        firstRoot = root1.toFixed(2);
        firstRootY = "0";
        secondRoot = root2.toFixed(2);
        secondRootY = "0";
        thirdRoot = root3.toFixed(2);
        thirdRootY = "0";
      } else if (discriminant > eps) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        const root1 = u + v - bNum / (3 * aNum);
        firstRoot = root1.toFixed(2);
        firstRootY = "0";
        secondRoot = "No real root";
        secondRootY = "Imaginary";
        thirdRoot = "No real root";
        thirdRootY = "Imaginary";
      } else {
        if (p === 0 && q === 0) {
          const root1 = -bNum / (3 * aNum);
          firstRoot = root1.toFixed(2);
          firstRootY = "0";
          secondRoot = root1.toFixed(2);
          secondRootY = "0";
          thirdRoot = root1.toFixed(2);
          thirdRootY = "0";
        } else {
          const u = Math.cbrt(-q / 2);
          const root1 = 2 * u - bNum / (3 * aNum);
          const root2 = -u - bNum / (3 * aNum);
          firstRoot = root1.toFixed(2);
          firstRootY = "0";
          secondRoot = root2.toFixed(2);
          secondRootY = "0";
          thirdRoot = root2.toFixed(2);
          thirdRootY = "0";
        }
      }

      // Calculate max and min values for the graph
      const derivativeA = 3 * aNum;
      const derivativeB = 2 * bNum;
      const derivativeC = cNum;
      const discriminantDerivative =
        derivativeB * derivativeB - 4 * derivativeA * derivativeC;
      const criticalx: number[] = [];
      if (discriminantDerivative >= 0) {
        const sqrtDiscDeriv = Math.sqrt(discriminantDerivative);
        const crit1 = (-derivativeB + sqrtDiscDeriv) / (2 * derivativeA);
        const crit2 = (-derivativeB - sqrtDiscDeriv) / (2 * derivativeA);
        criticalx.push(crit1, crit2);
      }

      return {
        aNum,
        bNum,
        cNum,
        dNum,
        p,
        q,
        discriminant,
        equation,
        roots: [
          { x: firstRoot, y: firstRootY },
          { x: secondRoot, y: secondRootY },
          { x: thirdRoot, y: thirdRootY },
        ],
        criticalPoints: criticalx.map((x) => ({
          x,
          y: aNum * x ** 3 + bNum * x ** 2 + cNum * x + dNum,
        })),
      };
    }
    return null;
  }, [a, b, c, d]);

  const saveEquation = () => {
    if (computed) {
      const newEquation: Equation = {
        a: computed.aNum,
        b: computed.bNum,
        c: computed.cNum,
        d: computed.dNum,
        equation: computed.equation,
      };
      if (savedEquations.some((eq) => eq.equation === newEquation.equation))
        return;
      setSavedEquations((prev) => [...prev, newEquation]);
    }
  };

  const discTag = computed
    ? computed.discriminant > 1e-10
      ? "Δ > 0 — one real root, two complex conjugate roots"
      : computed.discriminant < -1e-10
        ? "Δ < 0 — three distinct real roots"
        : "Δ = 0 — one real root, one repeated real root"
    : null;

  return (
    <div
      className="min-h-screen bg-zinc-950 text-white"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="mb-5 flex items-baseline gap-4 justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Cubic Solver
          </h1>
        </div>

        <CubicInput
          a={a}
          b={b}
          c={c}
          d={d}
          setA={setA}
          setB={setB}
          setC={setC}
          setD={setD}
          saveEquation={saveEquation}
        />

        {/* Landscape body */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-5 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <CubicEquation equation={computed?.equation} />
            <CubicTable computed={computed} />
            <CubicHistory
              savedEquations={savedEquations}
              setA={setA}
              setB={setB}
              setC={setC}
              setD={setD}
            />
          </div>

          {/* Right column - Graph */}
          <div className="flex flex-col gap-4">
            <CubicGraph computed={computed} />
            {discTag && (
              <div
                className={`rounded-lg border px-4 py-2.5 font-mono text-xs border-red-900/60 bg-red-950/20 text-red-400/80`}
              >
                {discTag}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');`}</style>
    </div>
  );
};
