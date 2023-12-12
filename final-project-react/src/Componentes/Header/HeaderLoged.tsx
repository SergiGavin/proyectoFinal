import React, { useEffect, useState } from 'react';
import './Header.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; // Importa el componente de dropdown de Bootstrap
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HeaderLoged: React.FC = () => {
    interface Book {
        id: number;
        titulo: String;
        autor: String;
    }

    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
    const idUsuarios = location.state?.idUsuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;

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

    // BUSCADOR

    const [searchValue, setSearchValue] = useState('');

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchTerm = (event.target as HTMLInputElement).value;
            setSearchValue(searchTerm);
            try {
                const response = await fetch(`http://localhost:8080/libros/tituloautor/${searchTerm}/${searchTerm}`);
                if (response.ok) {
                    const data: Book[] = await response.json();
                    console.log("info del data:  " + data);
                    setBooks(data);
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
            (event.target as HTMLInputElement).value = '';
        }
    };

    const handleBuscarClick = () => {
        navigate(`/Buscador`, { state: { id_usuarios, searchValue: searchValue, username, saldo } });
    };

    const navigate = useNavigate();

    const mostrarToastCierreSesionExito = () => {
        toast.success('¡Sesión cerrada!', {
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


    const handleHomeClick = () => {
        navigate("/home", { state: { id_usuarios: id_usuarios, username: username, saldo: saldo } });
    };
    const handleCierreSesionClick = () => {
        mostrarToastCierreSesionExito()
        navigate("/");
    };

    const handleDonateClick = () => {
        navigate('/donaciones', { state: { id_usuarios: id_usuarios, username: username, saldo: saldo } });
    };
    const handleHistorialClick = () => {
        navigate(`/historial`, { state: { id_usuarios: id_usuarios, username: username, saldo: saldo } });
    };


    // MOSTRAR 5 RESULTADOS DEL BUSCADOR Y QUE SE ACTUALICE

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setInputValue(event.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.titulo.toLowerCase().includes(inputValue.toLowerCase()) ||
        book.autor.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5); // Filtrar y obtener solo las primeras 5 opciones


    console.log("id usuario: " + id_usuarios + " username: " + username)
    return (
        <>
                <nav className="navbar navbarOrange">
                    <div className="container-fluid">
                        <a className="navbar-brand swapreadsTitulo mt-2" onClick={handleHomeClick} href=''>
                            <img src="./images/SRicono2.png" alt="Logo" className="d-inline-block align-text-top logoSR" />
                            SwapReads
                        </a>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2 buscador"
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                type="search"
                                list="datalistOptions"
                                placeholder="Buscar"
                                aria-label="Buscar"
                                value={searchValue} // Usar searchValue en lugar de inputValue
                            />
                            <datalist id="datalistOptions">
                                {filteredBooks.map((book, index) => (
                                    <option key={index} value={`${book.titulo}`}>
                                        <p className='negrita'>{book.autor}</p>
                                    </option>
                                ))}
                            </datalist>
                            <button className="btn buscar-btn" type="submit" onClick={handleBuscarClick}>
                                Buscar
                            </button>
                        </form>
                        <div className='d-flex mt-4'>
                            <p className='coins'>{saldo} <img src="./images/coin (3).png" className='coin' alt="coin" /> BookCoins</p>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className='loged-button'>
                                    {username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="" onClick={handleDonateClick}>Donar libros</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={handleHistorialClick}>Mis préstamos</Dropdown.Item>
                                    <Dropdown.Item href="">Ajustes de cuenta</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={handleCierreSesionClick}>Cerrar sesión</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </div>
                </nav>
        </>
    );
};

export default HeaderLoged;