import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

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
                    <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                    <datalist id="datalistOptions">
                        {books.map((book, index) => (
                            <option key={index} value={`${book.titulo}`}>
                                <strong className='negrita'>{book.autor}</strong>
                            </option>
                        ))}
                    </datalist>
                </div>
            </div>
            <div className="col-3">
                <button onClick={handleLoginClick} className='btn btn-inicioSesion btn-hover'>Iniciar Sesión</button>
            </div>
        </div>
    );
};

export default Header;