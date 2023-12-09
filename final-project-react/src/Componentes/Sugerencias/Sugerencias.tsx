
import "./Sugerencias.css"
import Libro from "../Libro/Libro";
import React from "react";

interface Tag {
    id: number
    name: string;
}

function Sugerencias() {

    const Tags: Tag[] = [
        {id: 1, name: 'Populares' },
        {id: 2, name: 'Disponibles' },
        {id: 3, name: 'Recientes' },
        // Asegúrate de importar las imágenes correspondientes aquí


    ];

    return (

        <div>
            {Tags.map(tag => (
                <div key={tag.id} className="">
                    <div className="cabecero mt-3"><p className="tag">{tag.name}</p></div>
                        <div className="row justify-content-center rowlibros">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="col collibros">
                                    <Libro />
                                </div>
                            ))}
                        </div>
                </div>
            ))}
        </div>
    );
}

export default Sugerencias;