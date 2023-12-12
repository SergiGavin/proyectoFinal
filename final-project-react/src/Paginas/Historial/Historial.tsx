import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Historial.css"
import HeaderLoged from '../../Componentes/Header/HeaderLoged';
import Footer from '../../Componentes/Footer/Footer';
import Table from 'react-bootstrap/Table';

const Historial: React.FC = () => {

    const location = useLocation();
    const idUsuarios = location.state?.id_usuarios;
    const id_usuarios = location.state?.id_usuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;
    const navigate = useNavigate();

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

                    if (prestamoLibros.length > 0) {
                        const results = await Promise.all(prestamoLibros.map(async (prestamo) => {
                            const idLibroPrestado = prestamo.id_libros;
                            const libroURL = `http://localhost:8080/libros/${idLibroPrestado}`;

                            const libroResponse = await fetch(libroURL, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            if (libroResponse.ok) {
                                const libroData = await libroResponse.json();
                                return { prestamo, libroData };
                            } else {
                                throw new Error('Error al obtener la información del libro');
                            }
                        }));

                        // Combinar los datos de préstamos y libros en un solo objeto
                        const combinedData = results.map(result => {
                            return {
                                prestamo: result.prestamo,
                                libroData: result.libroData
                            };
                        });

                        // Ordenar los préstamos por fecha de manera descendente
                        combinedData.sort((a, b) => {
                            const dateA = new Date(a.prestamo.fechaDevolucion).getTime();
                            const dateB = new Date(b.prestamo.fechaDevolucion).getTime();
                            return dateB - dateA;
                        });

                        // Actualizar el estado con los datos combinados y ordenados
                        setPrestamos(combinedData.map(item => item.prestamo));
                        setBooks(combinedData.map(item => item.libroData));
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

        if (idUsuarios) {
            getBookInfo();
        }
    }, [idUsuarios]);

    return (
        <div>
            <HeaderLoged />
            <div className='tabla-libros'>
                <Form>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Género</th>
                                <th>Estado</th>
                                <th>Fecha de préstamo</th>
                                <th>Fecha de devolución</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamos.map((prestamo, index) => (
                                <tr key={index}>
                                    <td className='imagen-libro'>
                                        {books[index]?.foto_portada && (
                                            <img
                                                src={books[index]?.foto_portada}
                                                alt={books[index]?.titulo}
                                            />
                                        )}
                                    </td>
                                    <td>{books[index]?.titulo}</td>
                                    <td>{books[index]?.autor}</td>
                                    <td>{books[index]?.genero}</td>
                                    <td>{books[index]?.estado}</td>
                                    <td>{new Date(prestamo.fechaPrestamo).toLocaleDateString()}</td>
                                    <td>{new Date(prestamo.fechaDevolucion).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Form>
            </div>
            <Footer />
        </div>
    );
}
export default Historial;