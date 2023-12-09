import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import HeaderOnlyTitle from '../../Componentes/Header/HeaderOnlyTitle';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePassdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    };

    const navigate = useNavigate(); // Aquí se declara useNavigate correctamente

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        try {
            const response = await fetch('http://localhost:8080/usuarios/iniciarsesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, pass })
            });

            if (response.ok) {
                // Manejar la autenticación exitosa aquí, como redirigir a otra página.
                console.log('Autenticación exitosa');
                navigate('/');
            } else {
                // Manejar la autenticación fallida aquí, mostrar mensaje de error, etc.
                console.error('Error en la autenticación');
            }
        } catch (error) {
            // Manejar errores de conexión, etc.
            console.error('Error en la conexión');
        }
    };

    return (
        <>
            <HeaderOnlyTitle/>
            <div className="cajatextoinicio">
                <h2>Iniciar Sesión</h2>
            </div>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <div className="correo">
                        <div className="row g-3 mb-4">
                            <div className="col-4  emailpasstext">
                                <label htmlFor="inputPassword6" className="col-form-label">Usuario</label>
                            </div>
                            <div className="col-8">
                                {/* // Usuario */}
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control input-texto borde"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    autoComplete="username" // Indica que este campo es para un nombre de usuario
                                />                            </div>
                        </div>
                    </div>
                    <div className="pass">
                        <div className="row g-3 align-items-center">
                            <div className="col-4 emailpasstext">
                                <label htmlFor="inputPassword6" className="col-form-label passtext">Contraseña</label>
                            </div>
                            <div className="col-8">
                                {/* // Contraseña */}
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control input-texto borde"
                                    aria-describedby="passwordHelpInline"
                                    value={pass}
                                    onChange={handlePassdChange}
                                    autoComplete="current-password" // Indica que este campo es para una contraseña
                                />                                
                                <p className="form-text apuntecontrasena">
                                    Debe ser 8-20 caracteres de longitud.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row rowbtn">
                        <button type="submit" className="btn btn-login btn-lg mt-5">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
            <div className="row rowregistro">
                <div className="col"> ¿No tienes una cuenta? <Link to="/register">¡Regístrate!</Link></div>
            </div>
            <div className="row rowicon">
                <img src="icono.png" className='iconologin' alt="icono" />
            </div>
        </>

    );
};

export default Login;