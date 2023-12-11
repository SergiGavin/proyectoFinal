import React, { useEffect, useState } from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; // Importa el componente de dropdown de Bootstrap


const HeaderLoged: React.FC = () => {

    interface Book {
        id: number;
        titulo: String;
        autor: String;
    }

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8080/libros');
                if (!response.ok) {
                    throw new Error('Error al obtener los libros');
                }
                const data: Book[] = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };

        fetchBooks();
    }, []);
    const [searchValue, setSearchValue] = useState('');

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchTerm = (event.target as HTMLInputElement).value;
            setSearchValue(searchTerm);
            try {
                const response = await fetch(`http://localhost:8080/libros/tituloautor/${searchTerm}/${searchTerm}`);
                if (response.ok) {
                    const data: Book[] = await response.json();
                    console.log("info del data:  "+data);
                    setBooks(data);
                }else{
                    console.log("error");
                }
                
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
            // Realiza la búsqueda en la base de datos usando el valor de searchTerm
            // Limpia el input después de presionar Enter (si es necesario)
            (event.target as HTMLInputElement).value = '';
        }
    };

    const coins: number = 500;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    const navigate = useNavigate();

    const handleLoginSearch = () => {
        navigate('/login');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleDonateClick = () => {
        navigate('/donaciones');
    };
    const handleHistorialClick = () => {
        navigate('/historial');
    };

    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios
    const handleBuscarClick = () => {
        navigate('/Buscador', { state: { id_usuarios: location.state?.id_usuarios, searchValue: searchValue } });
    };

    const [query, setQuery] = useState('');

    return (
        <>
            <nav className="navbar navbarOrange">
                <div className="container-fluid">
                    <a className="navbar-brand swapreadsTitulo mt-2" onClick={handleHomeClick} href="#">
                        <img src="./images/SRicono2.png" alt="Logo" className="d-inline-block align-text-top logoSR" />
                        SwapReads
                    </a>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 buscador" type="search" list="datalistOptions" onChange={handleInputChange} placeholder="Buscar" aria-label="Buscar" />
                        <datalist id="datalistOptions">
                            {books.map((book, index) => (
                                <option key={index} value={`${book.titulo}`}>
                                    <strong className='negrita'>{book.autor}</strong>
                                </option>
                            ))}
                        </datalist>
                        {/* <button className="btn buscar-btn" onClick={handleLoginSearch} type="submit">Buscar</button> */}
                        <button className="btn buscar-btn" onClick={handleBuscarClick} type="submit">Buscar</button>
                    </form>
                    <div className='d-flex mt-4'>
                        <p className='coins'>{coins} <img src="./images/coin (3).png" className='coin' alt="coin" /> Bookcoins</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className='loged-button'>
                                Usuario
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" onClick={handleDonateClick}>Donar libros</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={handleHistorialClick}>Mis préstamos</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Ajustes de cuenta</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={handleHomeClick}>Cerrar sesión</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default HeaderLoged;