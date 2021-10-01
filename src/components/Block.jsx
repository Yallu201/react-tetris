import React from "react";
import useBlock from "../hooks/useBlock";

const Block = () => {
  const [pos] = useBlock();
  const absolute_position = {
    left: `${pos.col * 34}px`,
    top: `${pos.row * 34}px`,
  };
  return (
    <div id="block" style={absolute_position}>
      <div className="block-line">
        <div className="block-line-box" />
        <div className="block-line-box" />
      </div>
      <div className="block-line">
        <div className="block-line-box" />
        <div className="block-line-box" />
      </div>
    </div>
  );
};

export default Block;
