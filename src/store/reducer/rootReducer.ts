import { combineReducers } from "redux";
import appData from "./app-data";
import user from "./user";

const AppReducer = combineReducers({
  appData: appData,
  user: user,
});

const rootReducer = (state: any, action: any) => {
  if (action.type == "RESET_APP") {
    return AppReducer(undefined, action);
  }
  return AppReducer(state, action);
};

export default rootReducer;
