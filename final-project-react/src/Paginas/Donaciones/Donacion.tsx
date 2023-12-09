import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import HeaderOnlyTitle from '../../Componentes/Header/HeaderOnlyTitle';

const Donaciones: React.FC = () => {
    const [book, setBook] = useState({
        titulo: '',
        genero: '',
        autor: '',
        num_pag: '',
        estado: '',
        //valor: '',
        //sinopsis: '',
        //foto_portada:'',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        navigate('/');
        e.preventDefault();
        try {
            console.log(JSON.stringify(book))
            const response = await fetch('http://localhost:8080/libros', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                console.log("Éxito")
            } else {
                throw new Error('Error al registrar el libro');
            }
        } catch (error) {
            console.error('Error al registrar libro:', error);
        }
    };


    return (
        <>
            <HeaderOnlyTitle />
            <div className="cajatextoinicio">
                <h2>¡Dona un libro!</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                <div className="row p-2 rowsinputsregis">
                    <div className="col-2">
                        <Form.Label className='texto-color'>Titulo</Form.Label>
                    </div>
                    <div className="col-4"><Form.Group controlId="formTitulo">
                        <Form.Control
                            className='borde'
                            type="text"
                            placeholder="Titulo"
                            name="titulo"
                            value={book.titulo}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                    </Form.Group></div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Género</Form.Label>
                    </div>
                    <div className="col-3">
                        <Form.Select
                            className='texto-color text-center' required>
                            <option value="">Seleccione genero</option>
                            <option value="clasica">Clásica</option>
                            <option value="fantasia">Fantasía</option>
                            <option value="ficcion">Ficción</option>
                            <option value="infantil">Infantil</option>
                            <option value="policiaca">Policiaca</option>
                            <option value="romance">Romance</option>
                            <option value="terror">Terror</option>
                            Genero
                        </Form.Select>
                    </div>
                </div>
                <div className="row p-2 rowsinputsregis">

                    <div className="col-2">
                        <Form.Label className='texto-color'>Autor</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formAutor">
                            <Form.Control
                                className='borde'
                                type="text"
                                placeholder="Autor"
                                name="autor"
                                value={book.autor}
                                onChange={handleChange}
                                maxLength={50}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Estado</Form.Label>
                    </div>
                    <div className="col-3">
                        <Form.Select className='texto-color text-center' required>Estado
                            <option value="">Seleccione estado</option>
                            <option value="bueno">Bueno</option>
                            <option value="decente">Decente</option>
                            <option value="malo">Malo</option>
                        </Form.Select>
                    </div>


                </div>
                <div className="row p-2 rowsinputsregis">
                    <div className="col-2">
                        <Form.Label className='texto-color'>Núm. de pág</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formNumPag">
                            <Form.Control
                                className='borde'
                                type="number"
                                placeholder="Número de páginas"
                                name="num_pag"
                                value={book.num_pag}
                                onChange={handleChange}
                                required
                                step="1" //Esto asegura que sean números enteros.
                                min="2" //Obliga a que el número de paginas sea 2 como minimo
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row rowbtn p-2 rowsinputsregis">
                    <div className="col">
                        <button type="submit" className="btn btn-login btn-lg mt-5">Donar libro</button>
                    </div>
                </div>
            </Form>
            <div className="row rowicon">
                <img src="icono.png" className='iconologin' alt="icono" />
            </div>

        </>
    );





};


export default Donaciones;