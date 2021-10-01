import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMousePosition from "./useMousePosition";
import { init, checkCrash, setDirection } from "../modules/block";
import { touchBlock } from "../modules/board";

const useBlock = () => {
  const dispatch = useDispatch();
  const isTouched = useSelector((_) => _.block.isTouched);
  const row = useSelector((_) => _.block.row);
  const col = useSelector((_) => _.block.col);
  const [mousePos] = useMousePosition();
  useEffect(() => {
    const callback = () => dispatch(checkCrash());
    const interval = setInterval(callback, 300);
    return () => clearInterval(interval);
  }, [dispatch]);
  useEffect(() => {
    if (isTouched) {
      dispatch(init());
      dispatch(touchBlock({ row, col }));
    }
  }, [dispatch, isTouched, row, col]);
  useEffect(() => {
    const blockNode_ = document.getElementById("block");
    const rect = blockNode_.getBoundingClientRect();
    const { left, right } = rect;
    const { x } = mousePos;
    const direction = getDirection({ x, left, right });
    dispatch(setDirection(direction));
  }, [dispatch, row, mousePos]);
  return [{ row, col }];
};

export default useBlock;

function getDirection({ x, left, right }) {
  let direction = "DOWN";
  if (x < left) {
    direction = "LEFT";
  } else if (x > right) {
    direction = "RIGHT";
  }
  return direction;
}
