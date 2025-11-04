export function PrevTurn({ index, onClick }) {
    return <button className="PrevTurn" id={`box-${index}`} onClick={onClick}></button>;
}
