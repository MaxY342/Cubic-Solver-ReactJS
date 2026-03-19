import { useRef, useEffect } from "react";

interface CubicGraphProps {
  computed: any;
}

export const CubicGraph = ({ computed }: CubicGraphProps) => {
  const graphRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = graphRef.current?.getContext("2d");
    if (!ctx || !computed || !graphRef.current) return;

    ctx.clearRect(0, 0, graphRef.current.width, graphRef.current.height);
    drawGrid(ctx);
    drawGraph(ctx, computed.aNum, computed.bNum, computed.cNum, computed.dNum);
    computed.roots.forEach((root: any) => {
      const x = Number(root.x);
      if (!isNaN(x)) drawPoint(ctx, x, 0);
    });
  }, [computed]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i <= 26; i++) {
      ctx.beginPath();
      ctx.strokeStyle = i === 13 ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)";
      ctx.moveTo(i * 20, 0);
      ctx.lineTo(i * 20, 520);
      ctx.moveTo(0, i * 20);
      ctx.lineTo(520, i * 20);
      ctx.stroke();
    }
  };

  const drawGraph = (ctx: CanvasRenderingContext2D, a: number, b: number, c: number, d: number) => {
    const unitGap = 20;
    const halfWidth = 260;
    const halfHeight = 260;
    ctx.strokeStyle = "rgba(255,0,0,1)";
    ctx.beginPath();
    for (let x = -13; x <= 13; x += 0.1) {
      const y = a * x ** 3 + b * x ** 2 + c * x + d;
      ctx.lineTo(x * unitGap + halfWidth, halfHeight - y * unitGap);
    }
    ctx.stroke();
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x * 20 + 260, 260 - y * 20, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0,0,255,1)";
    ctx.fill();
  };

  return <canvas ref={graphRef} width={520} height={520}></canvas>;
};