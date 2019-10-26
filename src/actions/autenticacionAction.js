import {
	GET_AUTENTICACION,
	GET_AUTENTICACION_CEL,
	CARGANDO,
	ERROR
} from "../types/autenticacionTypes";
import axios from "axios";

export const getAutentication = (telefono, numero) => async dispatch => {
	try {
		dispatch({
			type: CARGANDO,
			error: true
		});

		const respuesta = await axios.post(
			`https://elecciones2019.com.co/servicios/login.php`,
			{ documento: numero, telefono: telefono }
		);
		if (respuesta.data.error == 1) {
			dispatch({
				type: GET_AUTENTICACION,
				payload: "denied"
			});
		} else {
			dispatch({
				type: GET_AUTENTICACION,
				payload: respuesta.data
			});
		}
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: error
		});
	}
};

export const getAutenticationCel = (codigo, token) => async dispatch => {
	try {
		dispatch({
			type: CARGANDO,
			error: true
		});

		const respuesta = await axios.post(
			`https://elecciones2019.com.co/servicios/sms.php`,
			{ token: token, sms: codigo }
		);

		if (respuesta.data.error == 1) {
			dispatch({
				type: GET_AUTENTICACION_CEL,
				payload: "denied"
			});
		} else {
			dispatch({
				type: GET_AUTENTICACION_CEL,
				payload: respuesta
			});
		}
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: error
		});
	}
};
