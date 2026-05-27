import { useCallback } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (val: number) => void;
  "data-testid"?: string;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
  "data-testid": testId,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v)) {
        onChange(Math.min(max, Math.max(min, v)));
      }
    },
    [onChange, min, max]
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-[#5367FF] focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          {prefix && (
            <span className="px-2 py-1.5 text-sm font-semibold text-[#5367FF] bg-indigo-50 border-r border-gray-200">
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleInput}
            className="w-24 px-2 py-1.5 text-sm font-semibold text-gray-800 text-right outline-none bg-white"
            data-testid={testId ? `${testId}-input` : undefined}
          />
          {suffix && (
            <span className="px-2 py-1.5 text-sm font-semibold text-gray-500 bg-gray-50 border-l border-gray-200">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSlider}
        className="groww-slider"
        style={{
          background: `linear-gradient(to right, #5367FF ${pct}%, #e5e7eb ${pct}%)`,
        }}
        data-testid={testId ? `${testId}-slider` : undefined}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">
          {prefix}{min.toLocaleString("en-IN")}{suffix}
        </span>
        <span className="text-xs text-gray-400">
          {prefix}{max.toLocaleString("en-IN")}{suffix}
        </span>
      </div>
    </div>
  );
}




