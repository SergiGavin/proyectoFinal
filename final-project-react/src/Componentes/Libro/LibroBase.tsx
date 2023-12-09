import React from "react";
import "./Libro.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LibroBase = ({ libro }: { libro: any }) => {
    const navigate = useNavigate();

    const handleLibroClick = () => {
        console.log("ID del libro seleccionado:", libro.id_libros);
        navigate(`/prestamos`, { state: { id_libros: libro.id_libros } });
    };

    return (
        <div>
            <div className="card card-libro texto-morado mx-3 my-3" onClick={handleLibroClick}>
                <img src={libro.foto_portada} className="card-img-top contenedor-imagen libro-img" alt={libro.titulo} />
                <div className="card-body">
                    <h5 className="texto-morado">{libro.titulo}</h5>
                    <p className="texto-morado">{libro.autor}</p>
                    {/* Otros campos del libro */}
                </div>
            </div>
        </div>
    );
};

export default LibroBase;