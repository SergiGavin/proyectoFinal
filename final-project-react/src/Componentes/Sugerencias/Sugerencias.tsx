
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
                <div key={tag.id}>
                    <div className="cabecero mt-3"><p className="tag">{tag.name}</p></div>
                    <div>
                        <div className="row px-5 mt-3">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="col px-5">
                                    <Libro tagName={tag.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sugerencias;