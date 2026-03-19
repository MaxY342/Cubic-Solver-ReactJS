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
        <div>
            <h2>Saved Equations</h2>
            <ul>
                {savedEquations.map((eq, idx) => (
                    <li key={idx} onClick={() => handleClick(eq)}>
                        {eq.a}x³ + {eq.b}x² + {eq.c}x + {eq.d} = 0
                    </li>
                ))}
            </ul>
        </div>
    );
}