import { createAction, handleActions } from "redux-actions";
import { initBoard } from "./board";

const BASE_POINT = 10;

const START = "game/START";
const END = "game/END";
const GET_POINT = "game/GET_POINT";
const RESET = "game/RESET";

const initialState = {
  isStarted: false,
  isOver: false,
  score: 0,
  best: 0,
};
export const start = createAction(START);
export const end = createAction(END);
export const getPoint = createAction(GET_POINT, (lineCount) => lineCount);
export const reset = createAction(RESET);

export const resetGame = () => (dispatch) => {
  dispatch(initBoard());
  dispatch(reset());
};
export const gameOver = createAction(END);

const reducer = handleActions(
  {
    [START]: (state) => ({ ...state, isStarted: true }),
    [END]: (state) => ({ ...state, isOver: true }),
    [GET_POINT]: (state, { payload: lineCount }) => ({
      ...state,
      score: state.score + lineCount * BASE_POINT,
    }),
    [RESET]: (state) => ({
      ...initialState,
      best: Math.max(state.score, state.best),
    }),
  },
  initialState
);

export default reducer;
