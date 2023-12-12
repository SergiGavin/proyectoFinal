import React, { useEffect, useState } from "react";
import LibroBase from "../Libro/LibroBase";
import { useLocation } from "react-router-dom";
import "./Sugerencias.css";

interface Tag {
    id: number;
    name: string;
}

function Sugerencias() {
    const Tags: Tag[] = [
        { id: 1, name: 'Populares' },
        { id: 2, name: 'Disponibles' },
        { id: 3, name: 'Recientes' },
    ];

    // Recibir la prop
    const location = useLocation();
    const num = location.state?.categoryId;

    const [librosPorTag, setLibrosPorTag] = useState<Record<string, any[]>>({});

    useEffect(() => {
        const getUniqueRandomBooks = (books: any[], quantity: number) => {
            const uniqueBooks = new Set();
            while (uniqueBooks.size < quantity && uniqueBooks.size < books.length) {
                const randomIndex = Math.floor(Math.random() * books.length);
                uniqueBooks.add(books[randomIndex]);
            }
            return Array.from(uniqueBooks);
        };

        Tags.forEach(tag => {
            const item = tag.name.toLowerCase();
            fetch(`http://localhost:8080/libros/${item}`)
                .then(response => response.json())
                .then(data => {
                    const randomBooks = getUniqueRandomBooks(data, 5);
                    setLibrosPorTag(prevState => ({ ...prevState, [tag.name]: randomBooks }));
                })
                .catch(error => console.error(`Error al obtener los libros de ${item}:`, error));
        });
    }, []);

    return (
        <>
                <div>
                    {Tags.map(tag => (
                        <div key={tag.id} className="">
                            <div className="cabecero mt-3"><p className="tag">{tag.name}</p></div>
                            <div className="row justify-content-center mx-3 my-5">
                                {(librosPorTag[tag.name] || []).map((libro, index) => (
                                    <div key={index} className="col">
                                        <LibroBase libro={libro} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
        </>
    );
}

export default Sugerencias;