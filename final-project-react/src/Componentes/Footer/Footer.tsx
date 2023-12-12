import React from 'react';
import "./Footer.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer: React.FC = () => {
    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;
    const navigate = useNavigate();
    


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
        toast.success('¡Donación realizada con éxito!', {
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

    const handleDonateClick = () => {
        if (!id_usuarios) {
            mostrarToastDonacionNoExito();
            navigate(`/login`);
        } else {
            navigate(`/donaciones`, { state: { id_usuarios: id_usuarios, username: username, saldo: saldo } });
        }
        
    };

    return (
        <section className="footer">
            {/* Footer */}
            <footer className="text-center text-white">
                <div className="container p-4 pb-0 foot-donarlibros">
                    <section>
                        <p className="d-flex justify-content-center align-items-center">
                            <span className="me-3">Permite a los demás vivir las aventuras que tú ya has vivido.</span>
                            <button data-mdb-ripple-init type="button" className="btn donar-foot-btn btn-rounded" onClick={handleDonateClick}>
                                ¡Dona libros!
                            </button>
                        </p>
                    </section>
                </div>
                {/* Copyright */}
                <div className="text-center p-3 foot-copy">
                    © 2023 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">Swapreads.com</a>
                </div>
                {/* Copyright */}
            </footer>
        </section>
    );
};

export default Footer;