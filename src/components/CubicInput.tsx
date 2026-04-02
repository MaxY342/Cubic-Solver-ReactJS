interface CubicInputProps {
  a: string;
  b: string;
  c: string;
  d: string;
  setA: (val: string) => void;
  setB: (val: string) => void;
  setC: (val: string) => void;
  setD: (val: string) => void;
  saveEquation: () => void;
}

export const CubicInput = ({
  a,
  b,
  c,
  d,
  setA,
  setB,
  setC,
  setD,
  saveEquation,
}: CubicInputProps) => {
  const fields = [
    { label: "a", value: a, set: setA, warn: a === "0" || a === "" },
    { label: "b", value: b, set: setB },
    { label: "c", value: c, set: setC },
    { label: "d", value: d, set: setD },
  ];

  return (
    <div className="flex flex-col gap-5 bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 mb-5 md:flex-row">
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-3">
          Coefficients
        </p>
        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-3 flex-1 flex-wrap md:flex-row">
            {fields.map(({ label, value, set, warn }) => (
              <div
                key={label}
                className="flex flex-col gap-1 flex-1 min-w-[70px]"
              >
                <label className="text-xs font-bold tracking-widest uppercase text-red-400">
                  {label}
                </label>
                <input
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  type="number"
                  step="any"
                  placeholder="0"
                  required
                  className={`
                    w-full bg-zinc-900 border rounded px-3 py-2 text-center
                    font-mono text-lg text-white placeholder-zinc-600
                    outline-none transition-all duration-150
                    focus:ring-2 focus:ring-red-500/40
                    ${warn ? "border-red-700 focus:ring-red-700/50" : "border-zinc-700 focus:border-red-500/60"}
                  `}
                />
                {label === "a" && warn && (
                  <p className="text-xs text-red-500 font-mono uppercase">
                    a ≠ 0
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={saveEquation}
        className="
          h-12 self-center px-5 py-2 rounded text-sm font-bold tracking-widest uppercase
          bg-red-600 text-white cursor-pointer hover:bg-red-500
          transition-all duration-150 active:scale-95
        "
      >
        Save
      </button>
    </div>
  );
};
