import {
	SET_MESA,
	ENVIAR_IMAGEN,
	ENVIAR_VOTOS,
	CARGANDO,
	ERROR
} from "../types/formTypes";

const INITIAL_STATE = {
	mesa: "",
	envioImegen: false,
	envioVotos: false,
	error: "",
	cargando: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_MESA:
			return { ...state, mesa: action.payload };
		case ENVIAR_IMAGEN:
			return { ...state, envioImegen: true };
		case ENVIAR_VOTOS:
			return { ...state, envioVotos: action.payload };
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
