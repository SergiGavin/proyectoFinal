import { useEffect, useState } from 'react'
import Header from '../../Componentes/Header/Header';
import Categorias from '../../Componentes/Categorias/Categorias';
import LibroBase from '../../Componentes/Libro/LibroBase';

export default function Ficcion() {
    const [libros, setLibros] = useState<any[]>([]); // Estado para almacenar los libros

    useEffect(() => {
        // Llama a la API y actualiza el estado con los resultados
        fetch('http://localhost:8080/libros/genero/ficcion')
            .then(response => response.json())
            .then(data => setLibros(data))
            .catch(error => console.error('Error al obtener los libros:', error));
    }, []);

    const cantidadDeFilas = Math.ceil(libros.length / 5); // Calcula la cantidad de filas necesarias

    return (
        <>
            <Header />
            <Categorias />
            <div>
                {[...Array(cantidadDeFilas)].map((_, rowIndex) => (
                    <div key={rowIndex} className="row px-5 mt-3">
                        {libros.slice(rowIndex * 5, (rowIndex + 1) * 5).map((libro, colIndex) => (
                            <div key={colIndex} className="col px-5">
                                <LibroBase libro={libro} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>

    );
};

