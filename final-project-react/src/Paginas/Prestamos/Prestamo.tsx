import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import "./Prestamo.css"

const Prestamos: React.FC = () => {
    const location = useLocation();
    const id_libros = location.state?.id_libros;
    const id_usuarios = location.state?.id_usuarios;
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

    

    //OJO CON EL ID, HACER QUE PASE EL ID DEL USUARIO -------------------------------
    // DE MOMENTO DA ERROR EL ID USUARIO.
    //La fecha se pasa bien. 
    const [prestamo, setPrestamo] = useState({
        id_usuarios: id_usuarios, // Reemplaza con el ID del usuario actual
        id_libros: id_libros,
        fechaDevolucion: defaultReturnDate,
    });
    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);

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
                //Devolvemos el id_usuario al inicio para no cortar el flujo
                navigate(`/`, { state: { id_usuarios: id_usuarios} });
            } else {
                // La solicitud falló, maneja el error según tus necesidades
                console.error('Error al crear el préstamo');
                console.error('Error al crear el préstamo. Valores:', prestamo);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            console.error('Error al crear el préstamo. Valores:', prestamo);
        }
    };
    
    useEffect(() => {
        const getBookInfo = async () => {
            console.log("el id del libro pulsado es:   "+id_libros)
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
            <div className="bg-pantalla">
                <h1 className="title">SwapReads</h1>
            </div>
            <div className="cajatextoinicio">
                <h2>¡Alquila un libro!</h2>
            </div>
            <div className="texto-morado">
                <div className="row p-2 rowsinputsregis">
                    <div className="col-4">
                        <img src={book.foto_portada} className="card-img-top img-fluid contenedor-imagen" alt={book.titulo} />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h1 className="texto-morado mt-3">{book.titulo}</h1>
                            <p className="texto-morado"><strong>Autor: </strong> {book.autor}</p>
                            <p className="texto-morado"><strong>Núm. de pág: </strong> {book.num_pag}</p>
                            <p className="texto-morado"><strong>Estado: </strong> {book.estado}</p>
                            <p className="texto-morado"><strong>Valor en BookCoins: </strong> {book.valor}</p>
                            <p className="texto-morado texto-justificado"><strong>Sinopsis: </strong>{book.sinopsis}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row rowbtn p-2 rowsinputsregis">
                <div className="col">
                    <button type="submit" className="btn btn-login btn-lg mt-5" onClick={handleShowModal}>¡Tomar prestado!</button>
                </div>
            </div>
            <div className="row rowicon">
                <img src="icono.png" className='iconologin' alt="icono" />
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
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
                    <Button variant="primary" onClick={handleConfirmLoan}>
                        Confirmar Devolución
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default Prestamos;