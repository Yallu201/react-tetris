import { combineReducers } from "redux";
import block from "./block";
import board from "./board";
import game from "./game";

const rootReducer = combineReducers({ block, board, game });

export default rootReducer;
