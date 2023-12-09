import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Libro.css"
/*
interface LibroProps {
        tagName: string;
    }*/
const Libro = () => {
//const Libro: React.FC<LibroProps> = (props) => {
  //  const tagName = props.tagName.toLowerCase();

    const [book, setBook] = useState({
        id_libros: '',
        titulo: '',
        autor: '',
        foto_portada: ''
    });
    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
    

    const navigate = useNavigate();

    useEffect(() => {
        
        const obtenerLibroAleatorio = async () => {
            try {
                //const response = await fetch(`http://localhost:8080/libros/${tagName}`);
                const response = await fetch(`http://localhost:8080/libros/random`);
                console.log("Estado de la respuesta:", response.status);

                if (!response.ok) {
                    throw new Error('No se pudo obtener el libro');
                }
                const data = await response.json();
                // Asigna el libro aleatorio obtenido desde la API al estado 'book'
                setBook({
                    id_libros: data.id_libros,
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

    const handleLibroClick = () => {
        console.log("ID del libro seleccionado:", book.id_libros);
        console.log("ID del usuario iniciado sesion:", id_usuarios);
        navigate(`/prestamos`, { state: { id_libros: book.id_libros, id_usuarios: id_usuarios} });
    };
    return (
        <div>
            <div className="card texto-morado"onClick={handleLibroClick}>
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