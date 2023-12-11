import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {

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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSearch = () => {
        navigate('/login');
        //navigate(')
    };

    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios
    const handleDonarClick = () => {
        navigate(`/Donaciones`, { state: { id_usuarios: id_usuarios } });
    };
    const handleVolverInicio = () => {
        navigate(`/`, { state: { id_usuarios: id_usuarios } });
    };
    const handleHistorialClick = () => {
        navigate(`/Historial`, { state: { id_usuarios: id_usuarios } });
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleBuscarClick = () => {
        navigate('/Buscador', { state: { id_usuarios: location.state?.id_usuarios, searchValue: searchValue } });
    };
    
    const [query, setQuery] = useState('');
    console.log("dato del usuario introducido: " + searchValue)
    return (
        <>
            <nav className="navbar navbarOrange">
                <div className="container-fluid">
                    <a className="navbar-brand swapreadsTitulo mt-2" onClick={handleHomeClick} href="#">
                        <img src="./images/SRicono2.png" alt="Logo" className="d-inline-block align-text-top logoSR" />
                        SwapReads
                    </a>
                    {/*Todo lo de dentro de form es el buscador sergi  
                        Buscar por titulo y autor(si se puede)-- back json buscados por titulo
                        al darle te lleve a pagina de filtro donde salgan esos libros
                        copiar de Filtro una y adaptarla a ResultadoBuscador
                    */}
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 buscador" onKeyPress={handleKeyPress} onChange={handleInputChange} type="search" list="datalistOptions" placeholder="Buscar" aria-label="Buscar" />
                        <datalist id="datalistOptions">
                            {books.map((book, index) => (
                                <option key={index} value={`${book.titulo}`}>
                                    <strong className='negrita'>{book.autor}</strong>
                                </option>
                            ))}
                        </datalist>
                        {/* <button className="btn buscar-btn" onClick={handleSearch} type="submit">Buscar</button> */}
                        <button className="btn buscar-btn" onClick={handleBuscarClick} type="submit">Buscar</button>
                    </form>
                    <button className="btn sesion-btn" onClick={handleLoginClick} type="submit">Iniciar Sesión</button>
                </div>
            </nav>
        </>
    );
};

export default Header;