import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initBoard } from "../modules/board";
import { reset, start } from "../modules/game";
const Control = () => {
  const dispatch = useDispatch();
  const game = useSelector((_) => _.game);
  const onClick = useCallback(() => {
    if (!game.isStarted) dispatch(start());
    if (game.isOver) {
      dispatch(initBoard());
      dispatch(reset());
    }
  }, [dispatch, game]);
  return (
    <div className="control">
      <div className="control-info">
        <div>best: {game.best}</div>
        <div>score: {game.score}</div>
      </div>
      <button className="control-button" onClick={onClick}>
        {game.isOver ? "다시하기" : game.isStarted ? "게임 중..." : "시작하기"}
      </button>
    </div>
  );
};

export default Control;
