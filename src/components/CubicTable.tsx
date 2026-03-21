interface CubicTableProps {
  computed: any;
}

export const CubicTable = ({ computed }: CubicTableProps) => {
  return (
    <div className="w-full overflow-x-auto bg-zinc-900/70 border border-zinc-800 rounded-xl p-5">
      <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-3">
        Analysis
      </p>
      {computed ? (
        <table className="w-full font-mono text-sm border-collapse">
          <tbody>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-1.5 pr-4 text-zinc-500 font-normal w-1/3">p</th>
              <td className="py-1.5 text-zinc-300 text-right tabular-nums" colSpan={2}>
                {computed.p.toFixed(5)}
              </td>
            </tr>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-1.5 pr-4 text-zinc-500 font-normal w-1/3">q</th>
              <td className="py-1.5 text-zinc-300 text-right tabular-nums" colSpan={2}>
                {computed.q.toFixed(5)}
              </td>
            </tr>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-1.5 pr-4 text-zinc-500 font-normal w-1/3">Discriminant</th>
              <td className="py-1.5 text-zinc-300 text-right tabular-nums" colSpan={2}>
                {computed.discriminant.toFixed(5)}
              </td>
            </tr>

            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 pr-4 text-red-500/70 text-xs tracking-widest uppercase font-bold">
                Value
              </th>
              <th className="py-2 text-red-500/70 text-xs tracking-widest uppercase font-bold text-center">x</th>
              <th className="py-2 text-red-500/70 text-xs tracking-widest uppercase font-bold text-center">y</th>
            </tr>

            {computed?.roots.map((root: any, idx: number) => (
              <tr key={idx} className="border-b border-zinc-800/60">
                <th className="text-left py-1.5 pr-4 text-zinc-500 font-normal">Root {idx + 1}</th>
                <td className={`py-1.5 text-center tabular-nums ${root.y === "Imaginary" ? "text-zinc-700 italic" : "text-red-400"}`}>
                  {root.x}
                </td>
                <td className={`py-1.5 text-center tabular-nums ${root.y === "Imaginary" ? "text-zinc-700 italic" : "text-zinc-400"}`}>
                  {root.y}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="font-mono text-zinc-700 text-sm tracking-widest uppercase text-center py-5">
          no data
        </p>
      )}
    </div>
  );
};
