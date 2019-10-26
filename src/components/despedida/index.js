import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Titulo from "../general/Titulo";
import ContenedorCuerpo from "../general/ContenedorCuerpo";

class Despedida extends React.Component {
	render() {
		console.log(this.props);
		return (
			<React.Fragment>
				<Titulo tituloC="GRACIAS POR SU PARTICIPACIÓN" />
				<ContenedorCuerpo>
					<Titulo tituloC="La información fue almacenada exitosamene" />
					<Link to={"/"}>
						<Button
							onClick={this.handleclick}
							variant="success"
							type="submit"
							size="lg"
							block
							style={{ margin: 10, width: "95%" }}
						>
							Regresar
						</Button>
					</Link>
				</ContenedorCuerpo>
			</React.Fragment>
		);
	}
}

export default Despedida;
