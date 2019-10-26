import {
	SET_MESA,
	ENVIAR_IMAGEN,
	ENVIAR_VOTOS,
	CARGANDO,
	ERROR
} from "../types/formTypes";
import axios from "axios";

export const setMesa = mesa => async dispatch => {
	dispatch({
		type: SET_MESA,
		payload: mesa
	});
};

export const enviarImagen = (imagen, token, id_mesa) => async dispatch => {
	try {
		dispatch({
			type: CARGANDO,
			error: false
		});

		const respuesta = await axios.post(
			`https://elecciones2019.com.co/servicios/image.php`,
			{ image: imagen, id_mesa: id_mesa, token: token }
		);
		dispatch({
			type: ENVIAR_IMAGEN
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: error
		});
	}
};

export const enviarVotos = data => async dispatch => {
	try {
		dispatch({
			type: CARGANDO,
			error: false
		});

		const respuesta = await axios.post(
			`https://elecciones2019.com.co/servicios/votos.php`,
			data
		);
		dispatch({
			type: ENVIAR_VOTOS,
			payload: true
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: error
		});
	}
};
