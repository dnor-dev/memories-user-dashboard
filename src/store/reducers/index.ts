import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  posts: postReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
