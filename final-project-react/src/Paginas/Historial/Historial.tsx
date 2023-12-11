import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Historial.css"

const Historial: React.FC = () => {

    const location = useLocation();
    const idUsuarios = location.state?.id_usuarios;
    //const idUsuarios = 3;
    const navigate = useNavigate();
    /*
        const [prestamo, setPrestamo] = useState({
            id_prestamo: '',
            idUsuario: '',
            id_libros: '',
            fechaPrestamo: '',
            fechaDevolucion: ''
        });
    
        const [book, setBook] = useState({
            titulo: '',
            autor: '',
            genero: '',
            estado: '',
            foto_portada: ''
        });*/
    interface Prestamo {
        id_prestamo: string;
        idUsuario: string;
        id_libros: string;
        fechaPrestamo: string;
        fechaDevolucion: string;
    }

    interface Libro {
        titulo: string;
        autor: string;
        genero: string;
        estado: string;
        foto_portada: string;
    }

    const handleInicioClick = () => {
        navigate('/home', { state: { id_usuarios: location.state?.id_usuarios} });
    };
    const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
    const [books, setBooks] = useState<Libro[]>([]);

    useEffect(() => {
        const getBookInfo = async () => {
            console.log("el id del usuario es:   " + idUsuarios)
            try {
                const response = await fetch(`http://localhost:8080/prestamos/usuarios/${idUsuarios}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const urlPrestamos = `http://localhost:8080/prestamos/usuarios/${idUsuarios}`;
                console.log('URL del prestamo:', urlPrestamos);

                if (response.ok) {
                    const prestamoLibros = await response.json();
                    console.log(prestamoLibros);

                    if (prestamoLibros.length > 0) {
                        const promises = prestamoLibros.map(async (prestamo) => {
                            const idLibroPrestado = prestamo.id_libros;
                            console.log('idLibroPrestado: ', idLibroPrestado);
                            const libroURL = `http://localhost:8080/libros/${idLibroPrestado}`;
                            console.log('URL del libro:', libroURL);

                            const libroResponse = await fetch(libroURL, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            console.log("respuesta fetch libros: " + libroResponse)
                            if (libroResponse.ok) {
                                const libroData = await libroResponse.json();
                                return { prestamo, libroData };
                            } else {
                                throw new Error('Error al obtener la información del libro');
                            }
                        });
                        // Esperar a que todas las promesas se resuelvan
                        const results = await Promise.all(promises);

                        // Actualizar los estados después de que todas las promesas se hayan resuelto
                        setPrestamos(results.map(result => result.prestamo));
                        setBooks(results.map(result => result.libroData));
                    } else {
                        console.error('No hay préstamos para este usuario');
                    }
                } else {
                    throw new Error('Error al obtener la información del libro');
                }
            } catch (error) {
                console.error('Error al obtener la información del libro:', error);
            }
        };

        getBookInfo();
    }, [idUsuarios]);
    return (

        <div>
            <div className="bg-pantalla">
                <h1 className="title" onClick={handleInicioClick}>SwapReads</h1>
            </div>
            <div className="cajatextoinicio">
                <h2>Historial de préstamos</h2>
            </div>
            <Form>

            
            {prestamos.slice().reverse().map((prestamo, index) => (
                    <div key={index} className="row p-2 rowsinputsregis">
                        <div className="col-5">
                            <img src={books[index]?.foto_portada} className="card-img-top img-fluid contenedor-imagen" alt={books[index]?.titulo} />
                        </div>
                        <div className="col-7 margin">
                            <div>
                                <span className='texto-color'><strong>Título: </strong></span>
                                <span className='texto-color'>{books[index]?.titulo}</span>
                            </div>
                            <div>
                                <span className='texto-color'><strong>Autor: </strong></span>
                                <span className='texto-color'>{books[index]?.autor}</span>
                            </div>
                            <div>
                                <span className='texto-color'><strong>Género: </strong></span>
                                <span className='texto-color'>{books[index]?.genero}</span>
                            </div>
                            <div>
                                <span className='texto-color'><strong>Estado: </strong></span>
                                <span className='texto-color'>{books[index]?.estado}</span>
                            </div>
                            <div>
                                <span className='texto-color'><strong>Fecha del préstamo: </strong></span>
                                <span className='texto-color'>{new Date(prestamo.fechaPrestamo).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className='texto-color'><strong>Fecha de la devolución: </strong></span>
                                <span className='texto-color'>{new Date(prestamo.fechaDevolucion).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Form>

        </div>
    );
}
export default Historial;