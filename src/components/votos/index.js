import React from "react";
import { Redirect } from "react-router-dom";
import "../../css/contenedorVotos.css";

import * as formActions from "../../actions/formActions";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Titulo from "../general/Titulo";
import ContenedorVotos from "./ContenedorVotos";
import VotosNB from "./VotosNB";
import holman from "../../imagenes/candidatos/001.png";
import claudia from "../../imagenes/candidatos/002.png";
import galan from "../../imagenes/candidatos/003.png";
import miguelUribe from "../../imagenes/candidatos/004.png";
import holmcA from "../../imagenes/partidos/P001_01.png";
import holmcB from "../../imagenes/partidos/P001_02.png";
import holmcC from "../../imagenes/partidos/P001_03.png";
import claudiaA from "../../imagenes/partidos/P002_01.png";
import claudiaB from "../../imagenes/partidos/P002_02.png";
import galanA from "../../imagenes/partidos/P003_01.png";
import uribeA from "../../imagenes/partidos/P004_01.png";
import uribeB from "../../imagenes/partidos/P004_02.png";

const { enviarVotos } = formActions;

class Votos extends React.Component {
	manegoCambios = event => {
		let valor = event.currentTarget.value;
		if (valor.length > 2) {
			event.preventDefault();
		}
	};
	handlesubmit = async event => {
		event.preventDefault();
		const data = {
			token: this.props.autenticacionReducer.currentUser,
			id_mesa: this.props.formReducer.mesa,
			votos_001: document.getElementById("hm").value,
			votos_002: document.getElementById("cl").value,
			votos_003: document.getElementById("cg").value,
			votos_004: document.getElementById("mu").value,
			votos_996: document.getElementById("nulos").value,
			votos_997: document.getElementById("blancos").value
		};
		this.props.enviarVotos(data);
	};
	render() {
		if (this.props.formReducer.envioVotos) {
			return <Redirect from="/votos" to="/gracias" />;
		}
		return (
			<React.Fragment>
				<form onSubmit={this.handlesubmit}>
					<Titulo tituloC="Ingrese los votos" />
					<ContenedorVotos>
						<div>
							<img src={holman} className="imgCandidatos" alt="imagen" />
						</div>

						<div className="partidosInput">
							<h3 className="nombre">Holman Morris</h3>
							<div className="contenedorPartidos">
								<div className="contenedorImagenes">
									<img src={holmcA} className="imgpartido" alt="imagen" />
									<img src={holmcB} className="imgpartido" alt="imagen" />
									<img src={holmcC} className="imgpartido" alt="imagen" />
								</div>
								<input
									type="tel"
									onKeyPress={this.manegoCambios}
									className="inputVotos"
									id="hm"
								/>
							</div>
						</div>
					</ContenedorVotos>
					<ContenedorVotos>
						<div>
							<img src={claudia} className="imgCandidatos" alt="imagen" />
						</div>
						<div className="partidosInput">
							<h3 className="nombre">Claudia Lopez</h3>
							<div className="contenedorPartidos">
								<div className="contenedorImagenes">
									<img src={claudiaA} className="imgpartido" alt="imagen" />
									<img src={claudiaB} className="imgpartido" alt="imagen" />
								</div>
								<input
									type="tel"
									onKeyPress={this.manegoCambios}
									className="inputVotos"
									id="cl"
								/>
							</div>
						</div>
					</ContenedorVotos>
					<ContenedorVotos>
						<div>
							<img src={galan} className="imgCandidatos" alt="imagen" />
						</div>
						<div className="partidosInput">
							<h3 className="nombre">Carlos Fernando Galán</h3>
							<div className="contenedorPartidos">
								<div className="contenedorImagenes">
									<img src={galanA} className="imgpartido" alt="imagen" />
								</div>
								<input
									type="tel"
									onKeyPress={this.manegoCambios}
									className="inputVotos"
									id="cg"
								/>
							</div>
						</div>
					</ContenedorVotos>
					<ContenedorVotos>
						<div>
							<img src={miguelUribe} className="imgCandidatos" alt="imagen" />
						</div>
						<div className="partidosInput">
							<h3 className="nombre">Miguel Uribe Trubay</h3>
							<div className="contenedorPartidos">
								<div className="contenedorImagenes">
									<img src={uribeA} className="imgpartido" alt="imagen" />
									<img src={uribeB} className="imgpartido" alt="imagen" />
								</div>
								<input
									type="tel"
									onKeyPress={this.manegoCambios}
									className="inputVotos"
									id="mu"
								/>
							</div>
						</div>
					</ContenedorVotos>
					<VotosNB>
						<h3 className="nombreVB">Votos Nulos</h3>
						<input
							type="tel"
							onKeyPress={this.manegoCambios}
							className="inputVotos"
							id="nulos"
						/>
					</VotosNB>
					<VotosNB>
						<h3 className="nombreVB">Votos Blancos</h3>

						<input
							type="tel"
							onKeyPress={this.manegoCambios}
							className="inputVotos"
							id="blancos"
						/>
					</VotosNB>
					<Button
						variant="success"
						type="submit"
						size="lg"
						block
						style={{ margin: 10, width: "95%" }}
					>
						Terminar
					</Button>
				</form>
			</React.Fragment>
		);
	}
}
const mapStateToProps = ({ autenticacionReducer, formReducer }) => {
	return { autenticacionReducer, formReducer };
};
const mapDispatchToProps = {
	enviarVotos
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Votos);
