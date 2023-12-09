import React from 'react';
import "./Footer.css"
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate('/donaciones');
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