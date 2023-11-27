import React from 'react';
import "./Footer.css"
import { useState } from 'react';

function Footer() {

    const [searchValue, setSearchValue] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Capturamos el valor del input cuando se presiona Enter
            const searchTerm = (event.target as HTMLInputElement).value;
            setSearchValue(searchTerm);

            // Aquí puedes realizar la búsqueda en la base de datos usando el valor de searchTerm

            // Limpia el input después de presionar Enter (si se necesita)
            (event.target as HTMLInputElement).value = '';
        }
    };

    return (
        <>
            <div className="row fndo-naranja mt-5 footer-text">
                <div className="col">
                </div>
                <div className="col-4 enlaces">
                    <ul>
                        <li><a className="text" href="https://www.ejemplo1.com"> SOBRE NOSOTROS</a></li>
                        <li><a className="text" href="https://www.ejemplo2.com">CONTACTO</a></li>
                    </ul>
                </div>
                <div className="col-4 enlaces">
                    <ul>
                        <li><a className="text" href="https://www.ejemplo1.com">PUNTOS DE RECOGIDA</a></li>
                        <li><a className="text" href="https://www.ejemplo2.com">FAQs</a></li>
                    </ul>
                </div>
            </div>


        </>
    )
}

export default Footer