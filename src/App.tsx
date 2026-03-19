import { useState, useMemo } from "react";
import { CubicInput } from "./components/CubicInput";
import { CubicEquation } from "./components/CubicEquation";
import { CubicTable } from "./components/CubicTable";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";

export const App = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  type Equation = {
    a: number;
    b: number;
    c: number;
    d: number;
  };
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
      const discriminant = q * q / 4 + (p * p * p) / 27;
      const eps = 1e-10;

      let root1: number | undefined;
      let root2: number | undefined;
      let root3: number | undefined;
      let firstRoot = "";
      let firstRootY = "";
      let secondRoot = "";
      let secondRootY = "";
      let thirdRoot = "";
      let thirdRootY = "";

      const equation = `
        ${aNum}x³ ${bNum >= 0 ? "+" : "-"} ${Math.abs(bNum)}x²
        ${cNum >= 0 ? "+" : "-"} ${Math.abs(cNum)}x
        ${dNum >= 0 ? "+" : "-"} ${Math.abs(dNum)}
      `;

      if (discriminant < -eps) {
        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-(p * p * p) / 27)));
        root1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - bNum / (3 * aNum);
        root2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - bNum / (3 * aNum);
        root3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - bNum / (3 * aNum);

        firstRoot = root1.toFixed(2);
        firstRootY = "0";
        secondRoot = root2.toFixed(2);
        secondRootY = "0";
        thirdRoot = root3.toFixed(2);
        thirdRootY = "0";
      } else if (discriminant > eps) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        root1 = u + v - bNum / (3 * aNum);

        firstRoot = root1.toFixed(2);
        firstRootY = "0";
        secondRoot = "No real root";
        secondRootY = "Imaginary";
        thirdRoot = "No real root";
        thirdRootY = "Imaginary";
      } else {
        if (p === 0 && q === 0) {
          root1 = root2 = root3 = -bNum / (3 * aNum);

          firstRoot = root1.toFixed(2);
          firstRootY = "0";
          secondRoot = root2.toFixed(2);
          secondRootY = "0";
          thirdRoot = root3.toFixed(2);
          thirdRootY = "0";
        } else {
          const u = Math.cbrt(-q / 2);
          root1 = 2 * u - bNum / (3 * aNum);
          root2 = -u - bNum / (3 * aNum);

          firstRoot = root1.toFixed(2);
          firstRootY = "0";
          secondRoot = root2.toFixed(2);
          secondRootY = "0";
          thirdRoot = root2.toFixed(2);
          thirdRootY = "0";
        }
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
      };
    }
    return null;
  }, [a, b, c, d]);

  const saveEquation = () => {
    if (computed?.equation) {
      setSavedEquations((prev) => [...prev, { a: computed.aNum, b: computed.bNum, c: computed.cNum, d: computed.dNum }]);
    }
  }

  return (
    <div>
      <h1>Cubic Calculator</h1>
      <CubicInput a={a} b={b} c={c} d={d} setA={setA} setB={setB} setC={setC} setD={setD} saveEquation={saveEquation} />
      <CubicEquation equation={computed?.equation} />
      <CubicTable computed={computed} />
      <CubicGraph computed={computed} />
      <CubicHistory savedEquations={savedEquations} setA={setA} setB={setB} setC={setC} setD={setD} />
    </div>
  );
};