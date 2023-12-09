import { useEffect, useState } from 'react';
import Header from '../../Componentes/Header/Header';
import Categorias from '../../Componentes/Categorias/Categorias';
import LibroBase from '../../Componentes/Libro/LibroBase';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Componentes/Footer/Footer';

export default function Todos() {
    // Recibir la prop
    const location = useLocation();
    const num = location.state?.categoryId;

    const [libros, setLibros] = useState<any[]>([]); // Estado para almacenar los libros

    useEffect(() => {
        // Llama a la API y actualiza el estado con los resultados
        fetch('http://localhost:8080/libros/genero/infantil')
            .then(response => response.json())
            .then(data => setLibros(data))
            .catch(error => console.error('Error al obtener los libros:', error));
    }, []);

    const cantidadDeFilas = Math.ceil(libros.length / 5); // Calcula la cantidad de filas necesarias

    return (
        <>
            <Header />
            <Categorias num={num} />
            <div className="row justify-content-center mx-3 my-5">
                {[...Array(cantidadDeFilas)].map((_, rowIndex) => {
                    const librosFila = libros.slice(rowIndex * 5, (rowIndex + 1) * 5);
                    const librosMostrados = librosFila.map((libro, colIndex) => (
                        <div key={colIndex} className="col">
                            <LibroBase libro={libro} />
                        </div>
                    ));
                    const celdasVacias = Array.from({ length: 5 - librosFila.length }, (_, emptyIndex) => (
                        <div key={`empty-${emptyIndex}`} className="col">
                            {/* Componente para representar una celda vacía */}
                        </div>
                    ));

                    return (
                        <div key={rowIndex} className="row">
                            {[...librosMostrados, ...celdasVacias]}
                        </div>
                    );
                })}
            </div>
            <Footer />
        </>
    );
}

