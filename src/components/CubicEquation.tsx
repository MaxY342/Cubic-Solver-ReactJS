interface CubicEquationProps {
  equation?: string;
}

export const CubicEquation = ({ equation }: CubicEquationProps) => {
  return (
    <h2>{equation}</h2>
  );
};