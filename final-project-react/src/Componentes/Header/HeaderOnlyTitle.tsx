import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const HeaderOnlyTitle: React.FC = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <>
            <nav className="navbar navbarOrange">
                <div className="container-fluid">
                    <a className="navbar-brand swapreadsTitulo mt-2" onClick={handleHomeClick} href=''>
                        <img src="./images/SRicono2.png" alt="Logo" className="d-inline-block align-text-top logoSR" />
                        SwapReads
                    </a>
                    <form className="d-flex" role="search">
                    </form>
                    <div className='d-flex mt-4'>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default HeaderOnlyTitle;
