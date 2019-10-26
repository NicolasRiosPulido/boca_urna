import React from "react";

function TextoIndicacion(props) {
	return (
		<React.Fragment>
			<h3 className="texto-indicacion">{props.texto}</h3>
		</React.Fragment>
	);
}

export default TextoIndicacion;
