import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./Layout";
import Credenciales from "./credenciales";
import Codigo from "./codigo";
import Votos from "./votos";
import ConfirmarMesa from "./confirmarMesa";
import Imagen from "./imagen";
import Despedida from "./despedida";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Credenciales} />
						<Route exact path={this.props.autenticacionReducer.currentUser !== "error" ? "/codigo" : "/"} component={Codigo} />
						<Route exact path={this.props.autenticacionReducer.currentUser !== "error" ? "/confirmar" : "/"} component={ConfirmarMesa} />
						<Route exact path={this.props.autenticacionReducer.currentUser !== "error" ? "/imagen" : "/"} component={Imagen} />
						<Route exact path={this.props.autenticacionReducer.currentUser !== "error" ? "/votos" : "/"} component={Votos} />
						<Route exact path={this.props.autenticacionReducer.currentUser !== "error" ? "/gracias" : "/"} component={Despedida} />
					</Switch>
				</Layout>
			</BrowserRouter>
		);
	}
}
const mapStateToProps = ({ autenticacionReducer }) => {
	return { autenticacionReducer };
};
export default connect(
	mapStateToProps,
)(App);
