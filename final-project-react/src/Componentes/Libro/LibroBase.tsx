import React from "react";
import "./Libro.css"

const LibroBase = ({ libro }: { libro: any }) => {
    return (
        <div className="card texto-morado">
            <div className="container contenedor-imagen">
            <img src={libro.foto_portada} className="card-img-top libro-img" alt={libro.titulo} />
            </div>
            <div className="card-body">
                <h5 className="texto-morado">{libro.titulo}</h5>
                <p className="texto-morado">{libro.autor}</p>
                {/* Otros campos del libro */}
            </div>
        </div>
    );
};

export default LibroBase;