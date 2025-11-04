function TestDiv({ turn = undefined, onClick = undefined }) {
  return (
    <button className="PrevTurn" onClick={onClick}>Go to turn {turn}</button>
  );
}

export default TestDiv;
