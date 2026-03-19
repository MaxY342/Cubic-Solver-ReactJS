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

export const CubicInput = ({ a, b, c, d, setA, setB, setC, setD, saveEquation }: CubicInputProps) => {
  return (
    <form>
      <div>
        <label>a-value:</label>
        <input value={a} onChange={e => setA(e.target.value)} type="number" step="any" required />
        <p hidden={a !== "0" && a !== ""}>(a cannot be zero!)</p>
      </div>
      <div>
        <label>b-value:</label>
        <input value={b} onChange={e => setB(e.target.value)} type="number" step="any" required />
      </div>
      <div>
        <label>c-value:</label>
        <input value={c} onChange={e => setC(e.target.value)} type="number" step="any" required />
      </div>
      <div>
        <label>d-value:</label>
        <input value={d} onChange={e => setD(e.target.value)} type="number" step="any" required />
      </div>
      <button type="button" onClick={saveEquation}>Save</button>
    </form>
  )
};