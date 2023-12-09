import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderOnlyTitle from '../../Componentes/Header/HeaderOnlyTitle';

const Donaciones: React.FC = () => {
    
    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
    const [book, setBook] = useState({
        titulo: '',
        genero: '',
        autor: '',
        num_pag: '',
        estado: '',
    });

    const today = new Date();

    //FALTA RUTA USUARIO DE BOTON YA QUE AHORA MISMO ACTUALIZO PAGINA PARA IR
    // FALTA QUE PILLE EL LIBRO RECIEN CREADO.
    const [donacion, setDonacion] = useState({
        id_usuarios: id_usuarios,
        id_libros: null,  
        fecha_donacion: today.toISOString(),
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setBook({
            ...book,
            [name]: value,
        });
    };
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setBook({
            ...book,
            [name]: value,
        });
    };
    
    

    const registrarLibro = async () => {
        try {
            console.log(JSON.stringify(book))
            const response = await fetch('http://localhost:8080/libros', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log("Éxito")
                console.log(JSON.stringify(book))
                return responseData;
            } else {
                throw new Error('Error al registrar el libro');
            }
        } catch (error) {
            console.error('Error al registrar libro:', error);
        }
    }

    
    const registrarDonacion = async () => {
        try {
            const response = await fetch('http://localhost:8080/donaciones', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donacion),
            });
            console.log(JSON.stringify(donacion));
            if (response.ok) {
                console.log('Donacion creada exitosamente');
                console.log(JSON.stringify(donacion));
            } else {
                console.error('Error al crear la donacion. Valores:', donacion);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            console.error('Error al crear la donacion. Valores:', donacion);
        }
    };

        const [donacionRegistrada, setDonacionRegistrada] = useState(false);

        // Inserta el id libro usando el useEffect pero hace bucle al volver.
        useEffect(() => {
            // Verifica si la donación ya se ha registrado para evitar el bucle
            if (donacion.id_libros !== null && !donacionRegistrada) {
                registrarDonacion();
                // Marca la donación como registrada para evitar el bucle
                setDonacionRegistrada(true);
            }
        }, [donacion.id_libros, donacionRegistrada]);

    const registrarLibroAndDonacion = async () => {
        try {
            // Registrar el libro y obtener el id_libros
            const libroResponse = await registrarLibro();
            const id_libros = libroResponse?.id_libros;

            if (id_libros) {
                
                // Asignar id_libros a donacion
                setDonacion({
                    ...donacion,
                    id_libros: id_libros})
            

                // Registrar la donacion
                await registrarDonacion();
            } else {
                console.error('ID del libro no disponible después de registrar el libro.');
            }
        } catch (error) {
            console.error('Error al registrar libro y donacion:', error);
        }
    };
    const handleDonarClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await registrarLibroAndDonacion();
        console.log('Redireccionando a la página de inicio');
        navigate(`/`, { state: { id_usuarios: id_usuarios} });
    };


    return (
        <>
            <HeaderOnlyTitle />
            <div className="cajatextoinicio">
                <h2>¡Dona un libro!</h2>
            </div>
            <Form>
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
                            onChange={handleInputChange}
                            maxLength={100}
                            required
                        />
                    </Form.Group></div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Género</Form.Label>
                    </div>
                    <div className="col-3">
                        <Form.Select
                            className='texto-color text-center'
                            required
                            name="genero"
                            onChange={handleSelectChange}>
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
                                onChange={handleInputChange}
                                maxLength={50}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Estado</Form.Label>
                    </div>
                    <div className="col-3">
                        <Form.Select 
                        className='texto-color text-center'
                        required
                        name="estado"
                        onChange={handleSelectChange}
                        >Estado
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
                                onChange={handleInputChange}
                                required
                                step="1" //Esto asegura que sean números enteros.
                                min="2" //Obliga a que el número de paginas sea 2 como minimo

                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row rowbtn p-2 rowsinputsregis">
                    <div className="col">
                        <button type="submit" onClick={handleDonarClick} className="btn btn-login btn-lg mt-5">Donar libro</button>
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