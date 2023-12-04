import React, { useState } from 'react';
import { Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./registro.css"

const Register: React.FC = () => {
    const [userData, setUserData] = useState({
        id_usuario: 0,
        nombre: '',
        apellidos: '',
        dni: '',
        telefono: '',
        correo: '',
        username: '',
        pass: '',
        saldo: 0,
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        navigate('/');
        e.preventDefault();
        try {
            console.log("Datos enviados al servidor:", JSON.stringify(userData));
            const response = await fetch('http://localhost:8080/usuarios/registro', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log("Éxito")
            } else {
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <>
            <div className="bg-pantalla">
                <h1 className="title">SwapReads</h1>
            </div>
            <div className="cajatextoinicio">
                <h2>Registro</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                <div className="row p-2 rowsinputsregis">
                    <div className="col-2">
                        <Form.Label className='texto-color'>Nombre</Form.Label>
                    </div>
                    <div className="col-4"><Form.Group controlId="formFirstName">
                        <Form.Control
                        className='borde'
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={userData.nombre}
                            onChange={handleChange}
                        />
                    </Form.Group></div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Apellidos</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formLastName">
                            <Form.Control
                            className='borde'
                                type="text"
                                placeholder="Apellidos"
                                name="apellidos"
                                value={userData.apellidos}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row p-2 rowsinputsregis">
                    <div className="col-2">
                        <Form.Label className='texto-color'>DNI</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formDNI">

                            <Form.Control
                            className='borde'
                                type="text"
                                placeholder="DNI"
                                name="dni"
                                value={userData.dni}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Teléfono</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formPhone">

                            <Form.Control
                            className='borde'
                                type="text"
                                placeholder="Teléfono"
                                name="telefono"
                                value={userData.telefono}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row p-2 rowsinputsregis">
                    <div className="col-4">
                        <Form.Label className='texto-color'>Email</Form.Label>
                    </div>
                    <div className="col-8">
                        <Form.Group controlId="formEmail">

                            <Form.Control
                            className='borde'
                                type="email"
                                placeholder="Email"
                                name="correo"
                                value={userData.correo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row p-2 rowsinputsregis">
                    <div className="col-2">
                        <Form.Label className='texto-color'>Nombre de usuario</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formUsername">

                            <Form.Control
                            className='borde'
                                type="text"
                                placeholder="Nombre de usuario"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-2">
                        <Form.Label className='texto-color'>Contraseña</Form.Label>
                    </div>
                    <div className="col-4">
                        <Form.Group controlId="formPassword">

                            <Form.Control
                            className='borde'
                                type="password"
                                placeholder="Contraseña"
                                name="pass"
                                value={userData.pass}
                                onChange={handleChange}
                            />
                        </Form.Group>

                    </div>
                </div>
                <div className="row rowbtn p-2 rowsinputsregis">
                    <div className="col">
                    <button type="submit" className="btn btn-login btn-lg mt-5">Registrarse</button>
                    </div>
                </div>

            </Form>

            <div className="row rowicon">
                <img src="icono.png" className='iconologin' alt="icono" />
            </div>

        </>
    );
};

export default Register;