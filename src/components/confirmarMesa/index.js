import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Titulo from "../general/Titulo";
import Subtitulo from "../general/Subtitulo";
import TextoIndicacion from "../general/TextoIndicacion";
import ContenedorCuerpo from "../general/ContenedorCuerpo";

import * as formActions from "../../actions/formActions";

const { setMesa } = formActions;

class ConfirmarMesa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			zona: this.props.autenticacionReducer.info.data.info.zona_nombre,
			puesto: this.props.autenticacionReducer.info.data.info.puesto_nombre,
			mesas: this.props.autenticacionReducer.info.data.info.mesas
		};
	}
	handleChange = event => {
		this.props.setMesa(event.target.value);
	};
	render() {
		return (
			<React.Fragment>
				<Titulo tituloC="Confirme su ubicación" />
				<ContenedorCuerpo>
				<TextoIndicacion texto="Verifique los datos, en caso que no se 
				encuentre en este puesto, por favor comuníquese 
				con la linea de atención a testigos electorales" />
					<Titulo tituloC="Zona:" />
					<Subtitulo subtituloC={this.state.zona} />
					<Titulo tituloC="Puesto:" />
					<Subtitulo subtituloC={this.state.puesto} />
					<Titulo tituloC="Mesa:" />
					<select className="select" onChange={this.handleChange}>
						<option>Seleccione...</option>
						{this.state.mesas.map(data => (
							<option
								value={data.id}
								key={data.id}
							>{`Mesa ${data.mesa_numero}`}</option>
						))}
					</select>
					<Link to="/imagen">
						<Button
							variant="success"
							type="submit"
							size="lg"
							block
							style={{ marginTop: 30 }}
							onClick={this.setTelefonoClick}
						>
							Confirmar
						</Button>
					</Link>
				</ContenedorCuerpo>

			</React.Fragment>
		);
	}
}
const mapStateToProps = ({ autenticacionReducer, formReducer }) => {
	return { autenticacionReducer, formReducer };
};

const mapDispatchToProps = {
	setMesa
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfirmarMesa);
