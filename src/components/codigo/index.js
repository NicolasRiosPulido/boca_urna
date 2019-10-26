import React from "react";
import { Redirect } from "react-router-dom";
import "../../css/numero.css";

import * as autenticacionReducer from "../../actions/autenticacionAction";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Titulo from "../general/Titulo";
import TextoIndicacion from "../general/TextoIndicacion";
import ContenedorCuerpo from "../general/ContenedorCuerpo";
import Spinner from "../general/Spinner";

const { getAutenticationCel } = autenticacionReducer;

class Codigo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			modalCodigo: false
		};
	}
	manegoCambios = event => {
		let valor = event.currentTarget.value;
		let id = event.currentTarget.id;
		if (valor.length > 3) {
			event.preventDefault();
		}
	};
	SubmitHandler = async event => {
		event.preventDefault();
		const codigo = document.getElementById("codigo_a").value;
		await this.props.getAutenticationCel(
			codigo,
			this.props.autenticacionReducer.currentUser
		);

		if (this.props.autenticacionReducer.info.data.error === "101") {
			this.setState({ modal: true });
		}
	};
	componentDidMount() {
		this.setState({ modalCodigo: true });
	}
	render() {
		if (this.props.autenticacionReducer.info.length !== 0) {
			if (this.props.autenticacionReducer.info.data.error === "") {
				return <Redirect from="/" to="/confirmar" />;
			}
		}
		if (this.props.autenticacionReducer.cargando) {
			return <Spinner />;
		}
		return (
			<React.Fragment>
				<Titulo tituloC="Ingrese el codigo de verificación" />
				<ContenedorCuerpo>
					<TextoIndicacion
						texto="Recibirá un mensaje de texto el código,
					 puede que este tarde algunos segundos en llegar,
					 el código de verificación cambiara cada vez que
					 lo solicite."
					/>

					<Form onSubmit={this.SubmitHandler}>
						<div className="numeros">
							<Form.Group controlId="codigo_a" md="3">
								<Form.Control
									type="tel"
									required
									onKeyPress={this.manegoCambios}
									className="digitos"
									ref={elem => (this.textInput1 = elem)}
									pattern="[0-9]{0,5}"
								/>
							</Form.Group>
						</div>
						<Button
							variant="success"
							type="submit"
							size="lg"
							block
							style={{ marginTop: 15 }}
						>
							Ingresar
						</Button>
					</Form>
				</ContenedorCuerpo>
				{/* Modal error */}
				<Modal
					size="lg"
					show={this.state.modal}
					onHide={() => this.setState({ modal: false })}
					aria-labelledby="example-modal-sizes-title-lg"
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-lg">
							<h2>Atención</h2>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>
							El código no es valido, por favor espere a recibir el mensaje de texto
							con un código valido
						</h5>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="warning" onClick={() => this.setState({ modal: false })}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
				{/* modal codigo */}
				<Modal
					size="lg"
					show={this.state.modalCodigo}
					onHide={() => this.setState({ modalCodigo: false })}
					aria-labelledby="example-modal-sizes-title-lg"
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-lg">
							<h2>Atención</h2>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>
							{`En estos momentos estamos presentando retrasos en la entrega del mensaje de texto con los operadores de telefonía celular, por lo cual su código de verificación es: ${this.props.autenticacionReducer.codigo}`}
						</h5>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="warning"
							onClick={() => this.setState({ modalCodigo: false })}
						>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		);
	}
}
const mapStateToProps = ({ autenticacionReducer }) => {
	return { autenticacionReducer };
};
const mapDispatchToProps = {
	getAutenticationCel
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Codigo);
