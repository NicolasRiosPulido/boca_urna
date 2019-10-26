import React from "react";
import encabezadoImg from "../imagenes/encabezado.jpg";

function Layout(props) {
	return (
		<div className="cuerpo">
			<div className="encabezado" />
			<div className="contenido">{props.children}</div>
			<div className="footer" />
		</div>
	);
}

export default Layout;
