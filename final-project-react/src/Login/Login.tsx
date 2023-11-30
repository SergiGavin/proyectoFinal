import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate(); // Aquí se declara useNavigate correctamente

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        navigate('/');
        try {
            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
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
            <div className="bg-pantalla">
                <h1 className="title">SwapReads</h1>
            </div>
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
                                <input type="username" id="user" className="form-control input-texto borde" value={username} onChange={handleUsernameChange} />
                            </div>
                        </div>
                    </div>
                    <div className="pass">
                        <div className="row g-3 align-items-center">
                            <div className="col-4 emailpasstext">
                                <label htmlFor="inputPassword6" className="col-form-label passtext">Contraseña</label>
                            </div>
                            <div className="col-8">
                                <input type="password" id="inputPassword6" className="form-control input-texto borde" aria-describedby="passwordHelpInline" value={password} onChange={handlePasswordChange} />
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
            <div className="row rowicon">
                <img src="icono.png" className='iconologin' alt="icono" />
            </div>
        </>

    );
};

export default Login;