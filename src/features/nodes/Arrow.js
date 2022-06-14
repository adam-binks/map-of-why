export default function Arrow({ from, to }) {
    
    return (
        <svg width="300" height="100" style={{position: "absolute", top: "0", left: "0"}}>

            <defs>
                <marker id="arrow" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                    <path d="M2,2 L2,11 L10,6 L2,2" style={{fill: "red"}} />
                </marker>
            </defs>

            <path d="M0,150 L100,50"
                style={{stroke: 'red', strokeWidth: "1.25px", fill: "none", markerEnd: "url(#arrow)"}}
            />

        </svg>
    )
}