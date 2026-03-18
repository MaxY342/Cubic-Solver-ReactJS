import { CubicSolver } from './components/CubicSolver.tsx'
import { CubicEquation } from './components/CubicEquation.tsx'
import { CubicGraph } from './components/CubicGraph.tsx'
import { CubicHistory } from './components/CubicHistory.tsx'
import { CubicInput } from './components/CubicInput.tsx'
import { CubicTable } from './components/CubicTable.tsx'

export const App = () => {
  return (
    <div className="app">
      <CubicInput />
      <CubicEquation />
      <CubicGraph />
      <CubicTable />
      <CubicHistory />
      <CubicSolver />
    </div>
  )
}