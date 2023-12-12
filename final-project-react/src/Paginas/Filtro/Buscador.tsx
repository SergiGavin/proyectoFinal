import { useEffect, useState } from 'react';
import Header from '../../Componentes/Header/Header';
import HeaderLoged from '../../Componentes/Header/HeaderLoged';
import Categorias from '../../Componentes/Categorias/Categorias';
import LibroBase from '../../Componentes/Libro/LibroBase';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../../Componentes/Footer/Footer"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Todos() {
    const location = useLocation();
    const num = location.state?.categoryId;
    const id_usuarios = location.state?.id_usuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;
    const datoBuscador = location.state?.searchValue;
    const [libros, setLibros] = useState<any[]>([]);
    console.log(datoBuscador);
    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await fetch(`http://localhost:8080/libros/tituloautor/${datoBuscador}/${datoBuscador}`);

                if (!response.ok) {
                    throw new Error('Error al obtener los libros');
                }

                const data = await response.json();

                const librosResponseTitulo = data.titulo;
                const librosResponseAutor = data.autor;

                // Combina los resultados de título y autor en un solo array
                const librosResponse = librosResponseTitulo.concat(librosResponseAutor);

                console.log("Libros obtenidos:", JSON.stringify(librosResponse, null, 2));

                setLibros(librosResponse);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };

        // Verifica si hay datos de búsqueda antes de realizar la llamada a la API
        if (datoBuscador) {
            fetchLibros();
        }
    }, [datoBuscador]);

    
    const mostrarToastBuscadorVacio = () => {
        toast.error('Introduzca algun titulo o autor para buscar', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
            autoClose: 1000
        });
    };
    


    const cantidadDeFilas = Math.ceil(libros.length / 5);
    const renderHeader = () => {
        if (id_usuarios == null) {
            return <Header />;
        } else {
            return <HeaderLoged />;
        }
    }

    return (
        <>
            <div>
                {renderHeader()}
            </div>
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
