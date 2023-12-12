import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Prestamo.css"
import Header from '../../Componentes/Header/Header';
import Footer from "../../Componentes/Footer/Footer";
import Categorias from "../../Componentes/Categorias/Categorias";
import HeaderLoged from '../../Componentes/Header/HeaderLoged';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Prestamos: React.FC = () => {
    const location = useLocation();
    const id_libros = location.state?.id_libros;
    const id_usuarios = location.state?.id_usuarios;
    const idUsuarios = location.state?.id_usuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;

    const [book, setBook] = useState({
        titulo: '',
        genero: '',
        autor: '',
        num_pag: '',
        estado: '',
        valor: '',
        sinopsis: '',
        foto_portada: '',
    });
    const [defaultReturnDate, setDefaultReturnDate] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState(false);



    const [prestamo, setPrestamo] = useState({
        idUsuarios: idUsuarios,
        id_libros: id_libros,
        fechaDevolucion: defaultReturnDate,
    });
    const navigate = useNavigate();

    const handleShowModal = () =>{
        if(!idUsuarios){
            mostrarToastPrestamoNoExito()
            setShowModal(false);
        }else{
            setShowModal(true);
        }
        
    } 
    const mostrarToastPrestamoNoExito = () => {
        toast.error('Para tomar prestado un libro debe iniciar sesión', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
            autoClose: 2000
        });
        navigate('/login');
    };
    const mostrarToastPrestamoExito = () => {
        toast.success('¡Prestamo realizado con éxito!', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
            autoClose: 2000
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPrestamo((prevLoanForm) => ({
            ...prevLoanForm,
            [name]: value,
        }));
    };
    const handleConfirmLoan = async () => {
        try {
            const response = await fetch('http://localhost:8080/prestamos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prestamo),
            });
            console.log(JSON.stringify(prestamo));
            if (response.ok) {
                // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
                console.log('Préstamo creado exitosamente');
                handleCloseModal();
                mostrarToastPrestamoExito();
                //Devolvemos el id_usuario al inicio para no cortar el flujo
                navigate(`/home`, { state: { id_usuarios: id_usuarios, idUsuarios: idUsuarios, username: username, saldo: saldo} });
            } else {
                // La solicitud falló, maneja el error según tus necesidades
                console.error('Error al crear el préstamo');
                console.error('Error al crear el préstamo. Valores:', prestamo);
            }
        }catch (error) {
            console.error('Error al procesar la solicitud:', error);
            console.error('Error al crear el préstamo. Valores:', prestamo);
        }
        
    };


    const renderHeader = () => {
        if (id_usuarios == null) {
            return <Header />;
        } else {
            return <HeaderLoged />;
        }
    }

    useEffect(() => {
        const getBookInfo = async () => {
            console.log("el id del libro pulsado es:   " + id_libros)
            try {
                const response = await fetch(`http://localhost:8080/libros/${id_libros}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBook({
                        titulo: data.titulo,
                        genero: data.genero,
                        autor: data.autor,
                        num_pag: data.num_pag,
                        estado: data.estado,
                        valor: data.valor,
                        sinopsis: data.sinopsis,
                        foto_portada: data.foto_portada
                    });
                } else {
                    throw new Error('Error al obtener la información del libro');
                }
            } catch (error) {
                console.error('Error al obtener la información del libro:', error);
            }
        };

        getBookInfo();
        //Seleccionamos el dia de hoy, le sumamos 30 dias y formateamos la fecha.
        const today = new Date();
        const todayPlus30 = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        setDefaultReturnDate(todayPlus30);

    }, []);
    return (
        <>
            <div>
                {renderHeader()}
            </div>
            <Categorias num={0} />
            <div className="container-infolibro">
                <div className="texto-morado">
                    <div className="row g-0 align-items-center">
                        <div className="col-4 my-5 col-imagen">
                            <div className="contenedor-imagen">
                                <img src={book.foto_portada} alt={book.titulo} className='imagen' />
                            </div>
                        </div>
                        <div className="col my-5 col-info">
                            <div className="card-body">
                                <h1 className="texto-morado my-5">{book.titulo}</h1>
                                <div className="container-info">
                                    <p className="texto-morado my-3"><strong>Autor: </strong> {book.autor}</p>
                                    <p className="texto-morado my-3"><strong>Núm. de pág: </strong> {book.num_pag}</p>
                                    <p className="texto-morado my-3"><strong>Estado: </strong> {book.estado}</p>
                                    <p className="texto-morado my-3"><strong>Valor en BookCoins: </strong> {book.valor}</p>
                                    <p className="texto-morado texto-justificado my-3"><strong>Sinopsis: </strong>{book.sinopsis}</p>
                                </div>
                                <div className="boton">
                                    <button type="submit" className="btn boton-prestamo btn-lg  my-4" onClick={handleShowModal}>¡Tomar prestado!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} className='texto-morado'>
                    <Modal.Header closeButton>
                        <Modal.Title>Fecha de Devolución</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formFechaDevolucion">
                                <Form.Label>Selecciona la fecha de devolución:</Form.Label>
                                <Form.Control type="date" name="fechaDevolucion" defaultValue={defaultReturnDate.toISOString().split('T')[0]} onChange={handleInputChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmLoan} className='boton-dev'>
                            Confirmar Devolución
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

            <Footer />
        </>
    );
};
export default Prestamos;