import { useState } from "react";
import { formatINR } from "@/utils/formatters";

interface DonutChartProps {
  invested: number;
  returns: number;
}

const COLORS = ["#00B386", "#5367FF"];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(cx: number, cy: number, rInner: number, rOuter: number, startDeg: number, endDeg: number) {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  const s1 = polarToCartesian(cx, cy, rOuter, startDeg);
  const e1 = polarToCartesian(cx, cy, rOuter, endDeg);
  const s2 = polarToCartesian(cx, cy, rInner, endDeg);
  const e2 = polarToCartesian(cx, cy, rInner, startDeg);
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${e2.x} ${e2.y}`,
    "Z",
  ].join(" ");
}

export default function DonutChart({ invested, returns }: DonutChartProps) {
  const [tooltip, setTooltip] = useState<{ label: string; value: number; x: number; y: number } | null>(null);

  const safeReturns = Math.max(0, returns);
  const total = invested + safeReturns;

  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 90;
  const rInner = 56;
  const gap = 2;

  const segments = [
    { name: "Invested Amount", value: invested, color: COLORS[0] },
    { name: "Est. Returns", value: safeReturns, color: COLORS[1] },
  ];

  const paths: { path: string; color: string; name: string; value: number }[] = [];
  let currentAngle = 0;

  for (const seg of segments) {
    const pct = total > 0 ? seg.value / total : 0.5;
    const sweepDeg = pct * 360 - gap;
    const startDeg = currentAngle + gap / 2;
    const endDeg = startDeg + sweepDeg;
    paths.push({
      path: arcPath(cx, cy, rInner, rOuter, startDeg, endDeg),
      color: seg.color,
      name: seg.name,
      value: seg.value,
    });
    currentAngle += pct * 360;
  }

  return (
    <div className="w-full flex flex-col items-center" data-testid="donut-chart">
      <div className="relative inline-block">
        <svg width={size} height={size} style={{ overflow: "visible" }}>
          {paths.map((seg, i) => (
            <path
              key={i}
              d={seg.path}
              fill={seg.color}
              className="cursor-pointer transition-opacity hover:opacity-80"
              onMouseEnter={(e) => {
                const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
                const pRect = (e.currentTarget.closest("div") as HTMLElement).parentElement!.getBoundingClientRect();
                setTooltip({
                  label: seg.name,
                  value: seg.value,
                  x: e.clientX - pRect.left,
                  y: e.clientY - pRect.top - 48,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
          {/* Center label */}
          <text x={cx} y={cy - 9} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="Inter, sans-serif">
            Total Value
          </text>
          <text x={cx} y={cy + 13} textAnchor="middle" fill="#1e293b" fontSize={13} fontWeight="700" fontFamily="Inter, sans-serif">
            {formatINR(Math.round(total))}
          </text>
        </svg>
        {tooltip && (
          <div
            className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-xs pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y, transform: "translateX(-50%)" }}
          >
            <p className="font-semibold text-gray-700">{tooltip.label}</p>
            <p className="text-gray-600">{formatINR(Math.round(tooltip.value))}</p>
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-gray-500 font-medium">{seg.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



