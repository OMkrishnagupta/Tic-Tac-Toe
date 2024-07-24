import React from 'react';
import "./square.css"; // Assuming you have a CSS file named Square.css

const Square = ({ value, onSquareClick }) => {
  return (
    <div className='square'>
      <button onClick={onSquareClick}>{value}</button>
    </div>
  );
}

export default Square;
