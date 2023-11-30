import React, { useEffect, useState } from 'react';
import "./Libro.css"

const Libro = () => {
    const [book, setBook] = useState({
        titulo: '',
        autor: '',
        foto_portada: ''
    });

    useEffect(() => {
        const obtenerLibroAleatorio = async () => {
            try {
                const response = await fetch('http://localhost:8080/libros/random');
                if (!response.ok) {
                    throw new Error('No se pudo obtener el libro');
                }
                const data = await response.json();

                // Asigna el libro aleatorio obtenido desde la API al estado 'book'
                setBook({
                    titulo: data.titulo,
                    autor: data.autor,
                    foto_portada: data.foto_portada
                });
            } catch (error) {
                console.error('Error al obtener el libro:', error);
            }
        };

        obtenerLibroAleatorio();
    }, []);

    return (
        <div>
            <div className="card texto-morado">
                <img src={book.foto_portada} className="card-img-top img-fluid contenedor-imagen" alt={book.titulo} />
                <div className="card-body">
                    <h5 className="texto-morado">{book.titulo}</h5>
                    <p className="texto-morado">{book.autor}</p>
                    {/* Otros campos del libro */}
                </div>
            </div>
        </div>
    );
};

export default Libro;