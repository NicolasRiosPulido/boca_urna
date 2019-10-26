import { combineReducers } from "redux";
import autenticacionReducer from "./autenticacionReducer";
import formReducer from "./formReducer";

export default combineReducers({
    autenticacionReducer, formReducer
});
