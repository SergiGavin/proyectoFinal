import React from 'react';
import './Login.css'; // Archivo CSS para estilos

const LoginPage: React.FC = () => {
    return (
        <div className="container">
            <h1 className="title">SwapReads</h1>
            <div className="login-box">
                <form>
                    <h2>Iniciar Sesión</h2>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;