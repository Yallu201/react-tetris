import React from "react";
import { useSelector } from "react-redux";
import Block from "./Block";
const Board = () => {
  const STOCK = -1; // 블록이 닿아서 쌓인 상태
  const isStarted = useSelector((_) => _.game.isStarted);
  const isOver = useSelector((_) => _.game.isOver);
  const board = useSelector((_) => _.board);
  return (
    <div className="board">
      {isOver || (isStarted && <Block />)}
      {board.map((line, rowIndex) => (
        <Line key={`line_${rowIndex}`}>
          {line.map((state, colIndex) => (
            <Box
              key={`box_${rowIndex}_${colIndex}`}
              isStock={state === STOCK}
            />
          ))}
        </Line>
      ))}
    </div>
  );
};

export default Board;

const Line = ({ children }) => <div className="board-line">{children}</div>;
const Box = ({ isStock }) => (
  <div
    className="board-line-box"
    style={{ backgroundColor: isStock ? "Sienna" : "white" }}
  />
);
