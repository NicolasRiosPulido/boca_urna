import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/index.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import WebFont from "webfontloader";

WebFont.load({
	google: {
		families: ["Lato:300,400,700", "Barlow Semi Condensed:400, 700", "sans-serif"]
	}
});
const store = createStore(
	reducers, //todos los reduces
	{}, //estado inicial
	applyMiddleware(reduxThunk)
);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

