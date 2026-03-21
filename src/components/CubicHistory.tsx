interface CubicHistoryProps {
  savedEquations: any[];
  setA: (val: string) => void;
  setB: (val: string) => void;
  setC: (val: string) => void;
  setD: (val: string) => void;
}

export const CubicHistory = ({ savedEquations, setA, setB, setC, setD }: CubicHistoryProps) => {
  const handleClick = (eq: any) => {
    setA(String(eq.a));
    setB(String(eq.b));
    setC(String(eq.c));
    setD(String(eq.d));
  };

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5">
      <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-3">
        Saved Equations
      </p>
      {savedEquations.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {savedEquations.map((eq, idx) => (
            <li
              key={idx}
              onClick={() => handleClick(eq)}
              className="
                font-mono text-xs px-3 py-2 rounded border border-zinc-800
                bg-zinc-900/60 text-zinc-400 cursor-pointer
                hover:border-red-600/40 hover:text-red-300
                transition-all duration-150 active:scale-[.98]
              "
            >
              {eq.equation}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs font-mono text-zinc-700 tracking-widest uppercase text-center py-1">
          no saved equations
        </p>
      )}
    </div>
  );
};
