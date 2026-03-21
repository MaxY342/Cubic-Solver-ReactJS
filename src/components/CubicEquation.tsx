interface CubicEquationProps {
  equation?: string;
}

export const CubicEquation = ({ equation }: CubicEquationProps) => {
  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-5 py-4">
      <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-2">
        Equation
      </p>
      {equation ? (
        <p className="font-mono text-lg text-white tracking-wide">
          <span className="text-red-400">{equation}</span>
        </p>
      ) : (
        <p className="font-mono text-zinc-700 text-sm tracking-widest uppercase text-center">
          enter coefficients above
        </p>
      )}
    </div>
  );
};
