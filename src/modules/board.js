import { createAction, handleActions } from "redux-actions";
import { getPoint } from "./game";

const [STOCK, BOX] = [-1, 0];
const ROW = 20;
const COL = 10;

const INIT_BOARD = "board/INIT_BOARD";
const SET_BOARD = "board/SET_BOARD";

export const initBoard = createAction(INIT_BOARD);
export const setBoard = createAction(SET_BOARD, (board) => board);
export const touchBlock = (pos) => (dispatch, getState) => {
  const { board } = getState();
  const { row, col } = pos;
  const nextState = board
    .map((line, r) => {
      return line.map((box, c) => {
        if (r < row || row + 1 < r) return box;
        if (c < col || col + 1 < c) return box;
        return STOCK;
      });
    })
    .filter((line) => !line.every((box) => box === STOCK));
  const removedLine = ROW - nextState.length;
  let addLineCount = 0;
  while (removedLine > addLineCount++) {
    const baseLine = new Array(COL).fill(BOX);
    nextState.unshift(baseLine);
  }
  dispatch(getPoint(removedLine));
  dispatch(setBoard(nextState));
};

const initialState = new Array(ROW).fill(new Array(COL).fill(BOX));

const reducer = handleActions(
  {
    [INIT_BOARD]: () => initialState,
    [SET_BOARD]: (state, { payload }) => payload,
  },
  initialState
);

export default reducer;
