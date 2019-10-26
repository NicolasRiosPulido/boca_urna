import React from "react";
import { Redirect } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';

import * as formActions from "../../actions/formActions";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Titulo from "../general/Titulo";
import TextoIndicacion from "../general/TextoIndicacion";
import ContenedorCuerpo from "../general/ContenedorCuerpo";
import Spinner from "../general/Spinner";

const { enviarImagen } = formActions;

class Imagen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            archivo: false,
            nombrearchivo: "",
        }

    }
    handleChange = (event) => {
        var fileInput = false
        if (event.target.files[0]) {
            fileInput = true

        } else {
            this.setState({ archivo: false });
        }
        if (fileInput) {

            Resizer.imageFileResizer(
                event.target.files[0],
                1000,
                1000,
                'JPEG',
                100,
                0,
                uri => {
                    this.setState({ archivo: true, nombrearchivo: uri });
                },
                'base64'
            );

        }
    }
    handleClick = () => {
        const token = this.props.autenticacionReducer.currentUser;
        const mesa = this.props.formReducer.mesa;
        this.props.enviarImagen(this.state.nombrearchivo, token, mesa)
    }
    render() {
        if (this.props.formReducer.envioImegen) {
            return <Redirect from='/' to='/votos' />

        }
        if (this.props.autenticacionReducer.cargando) {
            return <Spinner />
        }
        return (
            <React.Fragment>
                <Titulo tituloC="E14" />
                <ContenedorCuerpo>

                    <Titulo tituloC="Capture la imagen del E14" />
                    <TextoIndicacion texto="Recuerde subir una foto clara, 
                    que incluya el código de barras y las margenes 
                    del formato E-14" />
                    <label className="subirImagen">
                        <input type="file" style={{ display: "none" }} accept=".png, .jpg, .jpeg" onChange={this.handleChange} />
                        Foto E14
</label>
                    {this.state.archivo ? <Button
                        variant="success"
                        type="submit"
                        size="lg"
                        block
                        style={{ margin: 10, width: "95%" }}
                        onClick={this.handleClick}
                    >
                        Siguiente
						</Button> : null}
                </ContenedorCuerpo>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ autenticacionReducer, formReducer }) => {
    return { autenticacionReducer, formReducer };
};
const mapDispatchToProps = {
    enviarImagen
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Imagen);