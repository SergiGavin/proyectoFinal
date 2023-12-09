import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Libro.css';

const Libro = () => {
    // Recibir la prop
    const location = useLocation();
    const num = location.state?.categoryId;


    const [book, setBook] = useState({
        id_libros: '',
        titulo: '',
        autor: '',
        foto_portada: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerLibro = async () => {
            try {
                const item = "item"
                const response = await fetch(`http://localhost:8080/libros/${item}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el libro');
                }
                const data = await response.json();

                // Verifica si data tiene los valores esperados
                console.log('Datos recibidos:', data);

                // Actualiza el estado de book con los datos recibidos
                setBook({
                    id_libros: data.id_libros,
                    titulo: data.titulo,
                    autor: data.autor,
                    foto_portada: data.foto_portada
                });

                console.log(book);
            } catch (error) {
                console.error('Error al obtener el libro:', error);
            }
        };

        obtenerLibro();
    },);

    const handleLibroClick = () => {
        console.log("ID del libro seleccionado:", book.id_libros);
        navigate(`/prestamos`, { state: { id_libros: book.id_libros } });
    };

    return (
        <div>
            <div className="card card-libro texto-morado mx-3" onClick={handleLibroClick}>
                <img src={book.foto_portada} className="card-img-top contenedor-imagen libro-img" alt={book.titulo} />
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