import { createAction, handleActions } from "redux-actions";
import { end } from "./game";

const INIT = "block/INIT";
const MOVE = "block/MOVE";
const SET_TOUCH = "block/SET_TOUCH";
const SET_DIRECTION = "block/SET_DIRECTION";

export const init = createAction(INIT);
export const moveBlock = createAction(MOVE, (pos) => pos);
export const setTouch = createAction(SET_TOUCH, (pos) => pos);
export const checkCrash = () => (dispatch, getState) => {
  const STOCK = -1;
  const { board, block } = getState();
  const { row, col, direction } = block;
  const underRow = row + 2;

  // 시작지점까지 블록이 쌓인경우
  if (board[row][col] === STOCK) {
    dispatch(end());
    return;
  }
  // 바닥에 닿으면 isTouch = true
  if (row + 2 === 20) {
    dispatch(setTouch());
    return;
  }
  // 아래 block이 있다면 isTouch = true
  const isTouchBlock = board[underRow]
    .slice(col, col + 2)
    .some((box) => box === STOCK);
  if (isTouchBlock) {
    dispatch(setTouch());
    return;
  }
  // 진행방향으로 블록이 붙어있는경우
  if (direction === "LEFT" && col > 0) {
    if (
      board[row][col - 1] ||
      board[row + 1][col - 1] ||
      board[row + 2][col - 1]
    ) {
      dispatch(setDirection("DOWN"));
    }
  } else if (direction === "RIGHT" && col < 18) {
    if (
      board[row][col + 2] ||
      board[row + 1][col + 2] ||
      board[row + 2][col + 2]
    ) {
      dispatch(setDirection("DOWN"));
    }
  }

  // 일반진행
  dispatch(moveBlock({ row, col }));
};
export const setDirection = createAction(
  SET_DIRECTION,
  (direction) => direction
);

const initialState = {
  row: 0, // 0 <= row && row + 1 < 20
  col: 4, // 0 <= col && col + 1 < 10
  isTouched: false,
  direction: null,
};

const reducer = handleActions(
  {
    [INIT]: ({ direction }) => ({ ...initialState, direction }),
    [MOVE]: ({ row, col, direction }) => {
      let nextRow = row + 1 === 19 ? row : row + 1;
      let nextCol = col;
      if (direction === "LEFT") nextCol = col === 0 ? col : col - 1;
      if (direction === "RIGHT") nextCol = col + 1 === 9 ? col : col + 1;
      return {
        row: nextRow,
        col: nextCol,
        isTouched: row + 1 === 19,
        direction,
      };
    },
    [SET_DIRECTION]: (state, { payload: direction }) => ({
      ...state,
      direction,
    }),
    [SET_TOUCH]: (state) => ({
      ...state,
      isTouched: true,
    }),
  },
  initialState
);

export default reducer;
