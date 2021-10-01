import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const callback = ({ pageX, pageY }) => setPos({ x: pageX, y: pageY });
    document.addEventListener("mousemove", callback);
    return () => document.removeEventListener("mousemove", callback);
  });
  return [pos];
};

export default useMousePosition;
