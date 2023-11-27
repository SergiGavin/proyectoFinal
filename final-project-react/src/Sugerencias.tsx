import React from 'react';
import "./Sugerencias.css"
import Libro from './Libro';

interface Tag {
    id: number
    name: string;
}

function Sugerencias() {

    const Tags: Tag[] = [
        {id: 1, name: 'Populares' },
        {id: 2, name: 'Disponibles' },
        {id: 3, name: 'Próximamente' },
        // Asegúrate de importar las imágenes correspondientes aquí
    ];

    return (
        <div>
            {Tags.map(tag => (
                <div key={tag.id}>
                    <div className="cabecero mt-3"><p>{tag.name}</p></div>
                    <div>
                        <div className="row px-5 mt-3">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="col px-5">
                                    <Libro />
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