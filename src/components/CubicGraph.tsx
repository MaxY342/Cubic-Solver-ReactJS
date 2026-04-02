import { useRef, useEffect } from "react";

interface CubicGraphProps {
  computed: any;
}

export const CubicGraph = ({ computed }: CubicGraphProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<HTMLCanvasElement | null>(null);

  const draw = () => {
    const canvas = graphRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Fix blur
    const dpr = window.devicePixelRatio || 1;
    const size = container.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const width = size, height = size;
    const cx = width / 2, cy = height / 2;
    const unit = size / 26;

    // Background
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, width, height);
    
    // Grid and axis
    ctx.fillStyle = "rgba(160,160,160,0.3)";
    ctx.font = `${Math.max(9, size * 0.022)}px monospace`;
    ctx.textAlign = "center";
    for (let i = 0; i <= 26; i++) {
      const isAxis = i === 13;
      if (i !== 13) {
        ctx.fillText(String(i - 13), i * unit, cy + 14);
        ctx.fillText(String(13 - i), cx + 12, i * unit + 4);
      }
      ctx.beginPath();
      ctx.strokeStyle = isAxis ? "rgba(220,220,220,0.25)" : "rgba(220,220,220,0.05)";
      ctx.lineWidth = isAxis ? 1 : 0.5;
      ctx.moveTo(i * unit, 0);
      ctx.lineTo(i * unit, height);
      ctx.moveTo(0, i * unit);
      ctx.lineTo(width, i * unit);
      ctx.stroke();
    }

    if (!computed) return;

    drawGraph(ctx, cx, cy, unit, computed.aNum, computed.bNum, computed.cNum, computed.dNum);
    computed.roots.forEach((root: any) => {
      const x = Number(root.x);
      if (!isNaN(x)) drawPoint(ctx, cx, cy, unit, x, 0, "#ffffff");
    });
    computed.criticalPoints.forEach((point: any) => {
      drawPoint(ctx, cx, cy, unit, point.x, point.y, "#ff0000");
    })
  };

  const drawGraph = (
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, unit: number,
    a: number, b: number, c: number, d: number
  ) => {
    ctx.strokeStyle = "#f04a4a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (let x = -13; x <= 13; x += 0.04) {
      const y = a * x ** 3 + b * x ** 2 + c * x + d;
      const px = cx + x * unit;
      const py = cy - y * unit;
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  };

  const drawPoint = (
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, unit: number,
    x: number, y: number, colour: string
  ) => {
    const px = cx + x * unit;
    const py = cy - y * unit;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.shadowColor = `${colour}70`;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    draw();
    const ro = new ResizeObserver(() => draw());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [computed]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={graphRef} className="w-full rounded-lg" />
    </div>
  );
};
