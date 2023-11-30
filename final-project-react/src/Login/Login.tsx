import React from 'react';
import "./Login.css"

const Login: React.FC = () => {





    return (
        <>
            <div className="bg-pantalla">
                <h1 className="title">SwapReads</h1>
            </div>
            <div className="cajatextoinicio">
                <h2>Iniciar Sesión</h2>
            </div>
            <div className="login-box">
                <form>
                    <div className="correo">
                        <div className="row g-3 mb-4">
                            <div className="col-4  emailpasstext">
                                <label htmlFor="inputPassword6" className="col-form-label">Usuario</label>
                            </div>
                            <div className="col-8">
                                <input type="email" className="form-control input-texto borde" />
                            </div>
                        </div>
                    </div>
                    <div className="pass">
                        <div className="row g-3 align-items-center">
                            <div className="col-4 emailpasstext">
                                <label htmlFor="inputPassword6" className="col-form-label passtext">Contraseña</label>
                            </div>
                            <div className="col-8">
                                <input type="password" id="inputPassword6" className="form-control input-texto borde" aria-describedby="passwordHelpInline" />
                                <p className="form-text apuntecontrasena">
                                Debe ser 8-20 carácetres de longitud.
                            </p>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row rowbtn">
                <button type="button" className="btn btn-login btn-lg mt-5">Iniciar Sesión</button>
                </div>
                
                
                
            </div>
            <div className="row rowicon">
                <img src="icono.png" className='iconologin' alt="icono"/>
                </div>
        </>

    );
};

export default Login;