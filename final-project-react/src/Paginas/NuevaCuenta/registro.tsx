import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./registro.css"
import HeaderOnlyTitle from '../../Componentes/Header/HeaderOnlyTitle';
import Footer from "../../Componentes/Footer/Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellidos: '',
        dni: '',
        correo: '',
        telefono: '',
        saldo: 0,
        username: '',
        pass: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    const mostrarToastRegistroNoExito = () => {
        toast.error('No se ha podido registrar. Revise los datos', {
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
    const mostrarToastRegistroUsuarioExistente = () => {
        toast.error('Ese nombre de usuario ya esta en uso. Revise los datos', {
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
    const mostrarToastRegistroExito = () => {
        toast.success('¡Registro completado!', {
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
    const handleRegistro = async (e: React.FormEvent) => {
        //TOASTY PARA FALTAN CAMPOS Y TODO OK
        e.preventDefault(); // Evita el envío del formulario por defecto
        const fields = Object.values(userData);
        const emptyFields = fields.some((field) => field === '');
    
        if (emptyFields) {
            // Mostrar mensaje de error indicando que algunos campos están vacíos
            console.error('Por favor, completa todos los campos');
        } else {
        try {
            const response = await fetch('http://localhost:8080/usuarios/registro', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                mostrarToastRegistroExito();
                navigate('/login');
                console.log("Éxito")
            } else {
                mostrarToastRegistroNoExito();
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            mostrarToastRegistroUsuarioExistente()
            console.error('Error al registrar usuario:', error);
        }
        }
    };

    return (
        <>
            <HeaderOnlyTitle />
            <div className="register-box">
                <h2 className='text-register my-5'>¡Comienza tu nueva aventura en Swapreads!</h2>
                <div className="card container-form register-box d-flex justify-content-center align-items-center text-inputs my-5">
                    <Form>
                        {/* NOMBRE Y APELLIDOS */}
                        <div className="row my-4 box-inputs">
                            <div className="col">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        className='input-texto'
                                        type="text"
                                        placeholder="Nombre"
                                        name="nombre"
                                        value={userData.nombre}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Group controlId="formLastName">
                                    <Form.Control
                                        className='input-texto'
                                        type="text"
                                        placeholder="Apellidos"
                                        name="apellidos"
                                        value={userData.apellidos}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {/* DNI Y TELEFONO */}
                        <div className="row my-4 box-inputs">
                            <div className="col">
                                <Form.Label>DNI</Form.Label>
                                <Form.Group controlId="formDNI">
                                    <Form.Control
                                        className='input-texto'
                                        type="text"
                                        placeholder="DNI"
                                        name="dni"
                                        maxLength={9}
                                        minLength={9}
                                        value={userData.dni}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Group controlId="formPhone">
                                    <Form.Control
                                        className='input-texto'
                                        type="text"
                                        placeholder="Teléfono"
                                        name="telefono"
                                        maxLength={9}
                                        minLength={9}
                                        value={userData.telefono}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {/* CORREO */}
                        <div className="row my-4 box-inputs">
                            <div className="col">
                                <Form.Label>Email</Form.Label>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        className='input-texto'
                                        type="email"
                                        placeholder="Email"
                                        name="correo"
                                        value={userData.correo}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {/* USUARIO Y CONTRASEÑA */}
                        <div className="row box-inputs">
                            <div className="col">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Group controlId="formUsername">
                                    <Form.Control
                                        className='input-texto'
                                        type="text"
                                        placeholder="Usuario"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Group controlId="formPassword">
                                    <Form.Control
                                        className='input-texto'
                                        type="password"
                                        placeholder="Contraseña"
                                        name="pass"
                                        minLength={8}
                                        value={userData.pass}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <p className='pass-text'>Debe contener 8 carácteres con una mayúsula y un número.</p>
                            </div>
                        </div>
                        {/* BOTÓN */}
                        <div className="container box-button mt-3">
                        <button className="btn boton-register btn-lg my-4" onClick={handleRegistro}>Registrarse</button>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;