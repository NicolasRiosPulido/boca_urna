import React from "react";
import { Redirect } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Titulo from "../general/Titulo";
import ContenedorCuerpo from "../general/ContenedorCuerpo";
import Spinner from "../general/Spinner";

import * as autenticacionReducer from "../../actions/autenticacionAction";
import { connect } from "react-redux";

const { getAutentication } = autenticacionReducer;

class Credenciales extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
	}
	componentWillMount() {
		if (
			this.props.autenticacionReducer.currentUser !== "error" &&
			this.props.autenticacionReducer.currentUser !== "denied"
		) {
			window.location.reload();
		}
	}
	SubmitHandler = async event => {
		event.preventDefault();
		const telefono = document.getElementById("telefono").value;
		const documento = document.getElementById("documento").value;
		await this.props.getAutentication(telefono, documento);
		if (this.props.autenticacionReducer.currentUser === "error" ||
			this.props.autenticacionReducer.currentUser === "denied") {
			this.setState({ modal: true });
		}
	};
	render() {
		if (
			this.props.autenticacionReducer.currentUser !== "error" &&
			this.props.autenticacionReducer.currentUser !== "denied"
		) {
			return <Redirect from="/" to="/codigo" />;
		}
		if (this.props.autenticacionReducer.cargando) {
			return <Spinner />;
		}
		return (
			<React.Fragment>
				<Titulo tituloC="Ingrese sus datos" />
				<ContenedorCuerpo>
					<form onSubmit={this.SubmitHandler}>
						<Form.Group>
							<Form.Label>Cedula de Ciudadania</Form.Label>
							<Form.Control type="tel" required id="documento" />
						</Form.Group>
						<Form.Group>
							<Form.Label>Numero de celular</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">+57</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="tel"
									aria-describedby="inputGroupPrepend"
									required
									id="telefono"
								/>
							</InputGroup>
						</Form.Group>
						<Button
							variant="success"
							type="submit"
							size="lg"
							block
							style={{ marginTop: 30 }}
						>
							Ingresar
						</Button>
					</form>
				</ContenedorCuerpo>
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
						<h5>Sus datos no son correctos o no se encuentra habilitado como testigo electoral.</h5>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="warning" onClick={() => this.setState({ modal: false })}>
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
	getAutentication
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Credenciales);
