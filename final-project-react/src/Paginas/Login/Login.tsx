import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import HeaderOnlyTitle from '../../Componentes/Header/HeaderOnlyTitle';
import Footer from "../../Componentes/Footer/Footer"


const Login: React.FC = () => {
    const [id_usuarios, setIdUsuario] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    let userData;
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePassdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    };
    const handleUsuarioInicioSesion = () => {
        console.log('ID del usuario en handleUsuarioInicioSesion:', userData.id_usuarios);
        navigate(`/`, { state: { id_usuarios: userData.id_usuarios } });
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
                userData = await response.json();
                setIdUsuario(userData.id_usuarios);
                console.log('ID del usuario que ha iniciado sesion:', userData.id_usuarios);
                handleUsuarioInicioSesion();
            } else {
                // Manejar la autenticación fallida aquí, mostrar mensaje de error, etc.
                const errorMessage = await response.text();
                console.error('Error en la autenticación:', errorMessage);
            }
        } catch (error) {
            // Manejar errores de conexión, etc.
            console.error('Error en la conexión');
        }
    };

    return (
        <>
            <HeaderOnlyTitle />

            <div className="login-box">
                        <div className="text-iniciarsesion my-5">
                            <h2>¡Inicia sesión con tu cuenta!</h2>
                        </div>
                        <div className="container-form login-box d-flex justify-content-center align-items-center text-userpass">
                        <form onSubmit={handleSubmit} className='form-box card'>
                            <div className="correo my-4">
                                <label htmlFor="inputPassword6" className="col-form-label text-userpass">Usuario</label>
                                {/* Campo de Usuario */}
                                <input
                                    type="text"
                                    id="username"
                                    placeholder='Usuario'
                                    name="username"
                                    className="form-control input-texto"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    autoComplete="username" // Indica que este campo es para un nombre de usuario
                                />
                            </div>
                            <div className="pass my-4">
                                <label htmlFor="inputPassword6" className="col-form-label text-userpass">Contraseña</label>
                                {/* Campo de Contraseña */}
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Contraseña'
                                    name="password"
                                    className="form-control input-texto"
                                    aria-describedby="passwordHelpInline"
                                    value={pass}
                                    onChange={handlePassdChange}
                                    autoComplete="current-password" // Indica que este campo es para una contraseña
                                />
                            </div>
                            <button type="submit" className="btn boton-iniciarsesion btn-lg my-5">Iniciar Sesión</button>
                        </form>
                        </div>
                        <div className="mt-4 mb-5"> ¿No tienes una cuenta? <Link to="/register">¡Regístrate!</Link></div>
                    </div>

            <Footer />
        </>
    );
};

export default Login;