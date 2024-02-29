import { combineReducers } from "redux";
import weatherReducer from "../state/weather/slice";
import locationReducer from "../state/location/slice";

const rootReducer = combineReducers({
  weatherReducer,
  locationReducer,
});

export default rootReducer;
