import React, { useState } from 'react';
import Square from './square'; // Assuming your Square component file is named Square.js
import './board.css';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [clicked, setClicked] = useState(Array(9).fill(false));

  function isArrayFilled(array) {
    for (let element of array) {
      if (!element) { // checks for falsy values (null, undefined, false, "", 0, NaN)
        return false;
      }
    }
    return true;
  }

  const isAllClicked = isArrayFilled(clicked);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);

  function result() {
    if (winner === null && isAllClicked) {
      return "No One";
    } else {
      return winner;
    }
  }

  const Result = result(); // Corrected to initialize Result with the result() function
  function handlerestart(){
    const nullArray = new Array(9).fill(null);
    const trueArray = new Array(9).fill(false);
    setSquares(nullArray);
    setClicked(trueArray);
    setTurn(true);
  }
  function handleClick(i) {
    if (clicked[i]) {
      return; // if already clicked, return early
    }

    const nextSquares = squares.slice();
    const nextClicked = clicked.slice();

    if (winner) {
      return; // if there's already a winner, return early
    }

    nextSquares[i] = turn ? "X" : "O";
    nextClicked[i] = true;

    setSquares(nextSquares);
    setClicked(nextClicked);
    setTurn(!turn);
  }

  const currentPlayer = turn ? "PLAYER X TURN" : "PLAYER O TURN";

  return (
    <>
      <div className='board'>
        <div className='row'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className='row'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className='row'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="turn">
        <h1>{currentPlayer}</h1>
        <h1>Winner: {Result} </h1>
        <div  className='RESTART'>
        <button onClick={handlerestart}> RESTART</button>
        </div>
      </div>
    </>
  );
}

export default Board;
