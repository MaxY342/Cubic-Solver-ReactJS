interface CubicTableProps {
  computed: any;
}

export const CubicTable = ({ computed }: CubicTableProps) => {
  return (
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
        {computed?.roots.map((root: any, idx: number) => (
          <tr key={idx}>
            <th>Root {idx + 1}</th>
            <td>{root.x}</td>
            <td>{root.y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};