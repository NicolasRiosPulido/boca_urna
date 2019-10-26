import {
	GET_AUTENTICACION,
	GET_AUTENTICACION_CEL,
	CARGANDO,
	ERROR
} from "../types/autenticacionTypes";

const INITIAL_STATE = {
	currentUser: "error",
	info: [],
	codigo: "",
	error: "",
	cargando: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_AUTENTICACION:
			return {
				...state,
				currentUser: action.payload.token,
				codigo: action.payload.codigo,
				cargando: false
			};
		case GET_AUTENTICACION_CEL:
			return { ...state, info: action.payload, cargando: false };
		case CARGANDO:
			return {
				...state,
				cargando: true
			};
		case ERROR:
			return {
				...state,
				cargando: false,
				error: action.payload
			};
		default:
			return state;
	}
};
