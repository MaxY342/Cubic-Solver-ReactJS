import { useState, useRef, useEffect, useMemo } from 'react'

export const CubicSolver = () => {
    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
    const [d, setD] = useState("")
    const graphRef = useRef<HTMLCanvasElement | null>(null);
    const computed = useMemo(() => {
        if (a !== "" && a !== "0") {
            const aNum = Number(a);
            const bNum = Number(b);
            const cNum = Number(c);
            const dNum = Number(d);
            const p: number = (3 * aNum * cNum - bNum * bNum) / (3 * aNum * aNum);
            const q: number = (2 * bNum * bNum * bNum - 9 * aNum * bNum * cNum + 27 * aNum * aNum * dNum) / (27 * aNum * aNum * aNum);
            const discriminant: number = (q * q) / 4 + (p * p * p) / 27;
            const eps = 1e-10;
            let root1: number | undefined;
            let root2: number | undefined;
            let root3: number | undefined;
            let firstRoot: string = "";
            let firstRootY: string = "";
            let secondRoot: string = "";
            let secondRootY: string = "";
            let thirdRoot: string = "";
            let thirdRootY: string = "";
            const equation = `
                ${aNum == 0 ? "" : String(aNum) + "x\u00b3"} 
                ${bNum == 0 ? "" : bNum < 0 ? "- " + String(Math.abs(bNum)) + "x\u00b2" : "+ " + String(Math.abs(bNum)) + "x\u00b2"} 
                ${cNum == 0 ? "" : cNum < 0 ? "- " + String(Math.abs(cNum)) + "x" : "+ " + String(Math.abs(cNum)) + "x"} 
                ${dNum == 0 ? "" : dNum < 0 ? "- " + String(Math.abs(dNum)) : "+ " + String(Math.abs(dNum))}`;

            if (discriminant < -eps) {
                const theta =
                (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-((p * p * p) / 27))));
                root1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - bNum / (3 * aNum);
                root2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - bNum / (3 * aNum);
                root3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - bNum / (3 * aNum);

                firstRoot = String(root1.toFixed(2));
                firstRootY = "0";
                secondRoot = String(root2.toFixed(2));
                secondRootY = "0";
                thirdRoot = String(root3.toFixed(2));
                thirdRootY = "0";
            } else if (discriminant > eps) {
                const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
                const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
                root1 = u + v - bNum / (3 * aNum);

                firstRoot = String(root1.toFixed(2));
                firstRootY = "0";
                secondRoot = "No real root";
                secondRootY = "Imaginary";
                thirdRoot = "No real root";
                thirdRootY = "Imaginary";
            } else {
                if (p === 0 && q === 0) {
                    root1 = root2 = root3 = -bNum / (3 * aNum);

                    firstRoot = String(root1.toFixed(2));
                    firstRootY = "0";
                    secondRoot = String(root2.toFixed(2));
                    secondRootY = "0";
                    thirdRoot = String(root3.toFixed(2));
                    thirdRootY = "0";
                } else {
                    const u = Math.cbrt(-q / 2);
                    root1 = 2 * u - bNum / (3 * aNum);
                    root2 = -u - bNum / (3 * aNum);

                    firstRoot = String(root1.toFixed(2));
                    firstRootY = "0";
                    secondRoot = String(root2.toFixed(2));
                    secondRootY = "0";
                    thirdRoot = String(root2.toFixed(2));
                    thirdRootY = "0";
                }
            }

            return { p, q, discriminant, equation, firstRoot, firstRootY, secondRoot, secondRootY, thirdRoot, thirdRootY };
        }
        return null;
    }, [a, b, c, d]);

    useEffect(() => {
        const ctx = graphRef.current?.getContext("2d") as CanvasRenderingContext2D;

        ctx.clearRect(0, 0, graphRef.current?.width || 0, graphRef.current?.height || 0);
        drawGrid(ctx);
        drawGraph(ctx, Number(a), Number(b), Number(c), Number(d));
        if (computed?.firstRoot !== undefined) {
            drawPoint(ctx, Number(computed.firstRoot), 0);
        }
        if (computed?.secondRoot !== undefined) {
            drawPoint(ctx, Number(computed.secondRoot), 0);
        }
        if (computed?.thirdRoot !== undefined) {
            drawPoint(ctx, Number(computed.thirdRoot), 0);
        }
    }, [computed]);

    function drawGrid(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i <= 26; i++) {
            ctx.beginPath();
            if (i === 13) {
            ctx.strokeStyle = "rgba(0, 0, 0, 1)";
            } else {
            ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
            }
            ctx.moveTo(i * 20, 0);
            ctx.lineTo(i * 20, 520);
            ctx.moveTo(0, i * 20);
            ctx.lineTo(520, i * 20);
            ctx.stroke();
        }
    }

    function drawGraph(ctx: CanvasRenderingContext2D, a: number, b: number, c: number, d: number) {
        ctx.strokeStyle = "rgba(255, 0, 0, 1)";
        const unitGap: number = 20;
        const halfWidth: number = (graphRef.current?.width ?? 0) / 2;
        const halfHeight: number = (graphRef.current?.height ?? 0) / 2;

        ctx.beginPath();
        for (let x = -13; x <= 13; x += 0.1) {
            const y: number = a * (x * x * x) + b * (x * x) + c * x + d;
            ctx.lineTo(x * unitGap + halfWidth, halfHeight - y * unitGap);
        }
        ctx.stroke();
    }

    function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.beginPath();
        ctx.arc(x * 20 + 260, 260 - y * 20, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(0, 0, 255, 1)";
        ctx.fill();
    }

    return (
        <div className="cubic-solver">
            <div>
                <h1>Cubic Calculator</h1>
            </div>
            <div>
            <form>
                <div>
                    <label>a-value:</label>
                    <input
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        type="number"
                        step="any"
                        required
                    />
                    <p hidden={a !== "0" && a !== ""}>(a cannot be zero!)</p>
                </div>
                <div>
                    <label>b-value:</label>
                    <input
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        type="number"
                        step="any"
                        required
                    />
                </div>
                <div>
                    <label>c-value:</label>
                    <input
                        value={c}
                        onChange={(e) => setC(e.target.value)}
                        type="number"
                        step="any"
                        required
                    />
                </div>
                <div>
                    <label>d-value:</label>
                    <input 
                        value={d}
                        onChange={(e) => setD(e.target.value)}
                        type="number"
                        step="any"
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
            </div>
            <div>
                <h2>{computed?.equation}</h2>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>p</th>
                                <td>{computed?.p}</td>
                            </tr>
                            <tr>
                                <th>q</th>
                                <td>{computed?.q}</td>
                            </tr>
                            <tr>
                                <th>Discriminant</th>
                                <td>{computed?.discriminant}</td>
                            </tr>
                            <tr>
                                <th>Value</th>
                                <th>x</th>
                                <th>y</th>
                            </tr>
                            <tr>
                                <th>Root 1</th>
                                <td>{computed?.firstRoot}</td>
                                <td>{computed?.firstRootY}</td>
                            </tr>
                            <tr>
                                <th>Root 2</th>
                                <td>{computed?.secondRoot}</td>
                                <td>{computed?.secondRootY}</td>
                            </tr>
                            <tr>
                                <th>Root 3</th>
                                <td>{computed?.thirdRoot}</td>
                                <td>{computed?.thirdRootY}</td>
                            </tr>
                        </tbody>
                    </table>
                    <canvas ref={graphRef} width="520" height="520"></canvas>
                </div>
            </div>

        </div>
    )
}