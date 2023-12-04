import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchTerm = (event.target as HTMLInputElement).value;
            setSearchValue(searchTerm);

            // Realiza la búsqueda en la base de datos usando el valor de searchTerm
            // Limpia el input después de presionar Enter (si es necesario)
            (event.target as HTMLInputElement).value = '';
        }
    };

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="row fndo-naranja">
            <div className="col-3">
                <p className="nombre mt-3">SwapReads</p>
            </div>
            <div className="col-6">
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">
                        Buscar
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        onKeyDown={(e) => handleKeyPress(e)}
                    />
                </div>
            </div>
            <div className="col-3">
                <button onClick={handleLoginClick} className='btn btn-inicioSesion btn-hover'>Iniciar Sesión</button>
            </div>
        </div>
    );
};

export default Header;