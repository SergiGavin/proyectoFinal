import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderOnlyTitle from '../../Componentes/Header/HeaderOnlyTitle';
import Footer from "../../Componentes/Footer/Footer";
import "./Donaciones.css";
import HeaderLoged from '../../Componentes/Header/HeaderLoged';
import Header from '../../Componentes/Header/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Donaciones: React.FC = () => {

    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;
    let usuarioBack = {
        id_usuarios: '',
        nombre: '',
        apellidos: '',
        dni: '',
        correo: '',
        telefono: '',
        saldo: 0,
        username: '',
        pass: ''
    };

    const [book, setBook] = useState({
        titulo: '',
        genero: '',
        autor: '',
        num_pag: 0,
        estado: '',
        foto_portada: "https://i.imgur.com/S9fIB5P.png"
    });


    const [usuario, setUsuario] = useState({
        id_usuarios: '',
        nombre: '',
        apellidos: '',
        dni: '',
        correo: '',
        telefono: '',
        saldo: 0,
        username: '',
        pass: ''
    });


    const calcularSaldo = (saldo: number, estado: String, book: { num_pag: number }): number => {
        let newSaldo = saldo + book.num_pag * 0.06;
        switch (estado) {
            case "malo":
                newSaldo *= 1;
                break;
            case "decente":
                newSaldo *= 1.1;
            case "bueno":
                newSaldo *= 1.2;
        }
        return newSaldo;
    }

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
    const mostrarToastDonacionNoExito = () => {
        toast.error('Para donar un libro debe iniciar sesión', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate('/login');
    };
    const mostrarToastDonacionExito = () => {
        toast.success('¡Donación realizada! Recuerde llevar su libro al punto de recogida para hacerla efectiva.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };




    const registrarLibro = async () => {
        setBook({
            ...book,
            foto_portada: "https://i.imgur.com/S9fIB5P.png"
        });
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


    // TOASTY
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
                    id_libros: id_libros
                })


                // Registrar la donacion
                await registrarDonacion();
                await actualizarUsuario();
            } else {
                console.error('ID del libro no disponible después de registrar el libro.');
            }
        } catch (error) {
            console.error('Error al registrar libro y donacion:', error);
        }
    };

    const actualizarUsuario = async () => {

        try {

            const response = await fetch(`http://localhost:8080/usuarios/${id_usuarios}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body for GET requests
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            const result = await response.json();
            usuarioBack = result;
            usuarioBack.saldo = calcularSaldo(result.saldo, result.estado, book);

            const responsePut = await fetch(`http://localhost:8080/usuarios/${id_usuarios}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioBack),
            });
            const responseData = await responsePut.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error as needed
        }


    }

    const handleDonarClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await registrarLibroAndDonacion();
        console.log('Redireccionando a la página de inicio');
        if (id_usuarios) {
            if (!book.titulo || !book.genero || !book.autor || !book.estado || !book.num_pag) {
                // Mostrar un toast de error indicando que todos los campos son obligatorios
                toast.error('Todos los campos del formulario son obligatorios', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
            mostrarToastDonacionExito()
            navigate(`/home`, { state: { id_usuarios: id_usuarios, username: username, saldo: usuarioBack.saldo } });
        } else if (!id_usuarios) {
            mostrarToastDonacionNoExito()
            navigate(`/login`, { state: { id_usuarios: id_usuarios } });
        }
    };

    const renderHeader = () => {
        if (!id_usuarios) {
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
            <div className="container donaciones-box">
                <h2 className='text-donacion my-5'>¡Comparte lo que has vivido!</h2>
                <div className="card donaciones-box d-flex justify-content-center align-items-center text-donacionesinputs my-4">
                    <Form>
                        <div className="row my-4">
                            <div className="col">
                                <Form.Label className='texto-color'>Titulo</Form.Label>
                                <Form.Group controlId="formTitulo">
                                    <Form.Control
                                        className='input-texto'
                                        type="text"
                                        placeholder="Titulo"
                                        name="titulo"
                                        value={book.titulo}
                                        onChange={handleInputChange}
                                        maxLength={100}
                                        required
                                    />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Label className='texto-color'>Género</Form.Label>
                                <Form.Select
                                    className='input-texto'
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
                        <div className="row my-4">
                            <div className="col">
                                <Form.Label className='texto-color'>Autor</Form.Label>
                                <Form.Group controlId="formAutor">
                                    <Form.Control
                                        className='input-texto'
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
                            <div className="col">
                                <Form.Label className='texto-color'>Estado</Form.Label>
                                <Form.Select
                                    className='input-texto'
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
                        <div className="row my-4">
                            <div className="col">
                                <Form.Label className='texto-color'>Núm. de pág</Form.Label>
                                <Form.Group controlId="formNumPag">
                                    <Form.Control
                                        className='input-texto'
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
                            <div className="col"></div>
                        </div>
                        <div className="container caja-boton-donar">
                            <button type="submit" onClick={handleDonarClick} className="btn boton-donacion btn-lg my-4 mb-4">Donar libro</button>
                        </div>
                    </Form>

                </div>

            </div>
            <Footer />
        </>
    );

};


export default Donaciones;