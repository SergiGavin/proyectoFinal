import React from 'react';
import "./Categorias.css"
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

interface CategoriasProps {
    num: number; // Recibe el número de la categoría
}

const Categorias: React.FC<CategoriasProps> = ({ num }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
    const username = location.state?.username;
    const saldo = location.state?.saldo;

    const categories: Category[] = [
        { id: 1, name: 'Clásica' },
        { id: 2, name: 'Drama' },
        { id: 3, name: 'Ficción' },
        { id: 4, name: 'Fantasía' },
        { id: 5, name: 'Histórica' },
        { id: 6, name: 'Policiaca' },
        { id: 7, name: 'Infantil' },
        { id: 8, name: 'Romance' },
        { id: 9, name: 'Terror' },
        { id: 10, name: 'Todos' },
        { id: 11, name: '¡Libro aleatorio!' },
        { id: 12, name: ' ' },
        // Asegúrate de importar las imágenes correspondientes aquí
    ];

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const currentPath = window.location.pathname.toLowerCase();

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        // navigate(`/${categories.find(cat => cat.id === categoryId && bucle)?.name.toLowerCase()}`, { state: { categoryId } });
        if (categoryId === 1) {
            navigate("/clasica", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 2) {
            navigate("/drama", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 3) {
            navigate("/ficcion", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 4) {
            navigate("/fantasia", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 5) {
            navigate("/historica", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 6) {
            navigate("/policiaca", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 7) {
            navigate("/infantil", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 8) {
            navigate("/romance", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        } else if (categoryId === 9) {
            navigate("/terror", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        }
        else if (categoryId === 10) {
            navigate("/todos", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        }
        else if (categoryId === 11) {
            if (currentPath !== '/random') {
                navigate("/random", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
            } else {
                window.location.reload();
            }
        } else if (categoryId === 12) {
            navigate("/buscador", { state: { categoryId: categoryId, id_usuarios: id_usuarios, username: username, saldo: saldo } });
        }

    };

    return (
        <div>
            <nav className="nav nav-underline navbar-violet">
                <ul className="nav buttons-box">
                    {categories.map((category) => (
                        <li className="nav-item" key={category.id}>
                            <div className='container'>
                                <button
                                    className={`nav-link mx-3 ${num === category.id ? 'categoria-naranja underline-effect' : 'boton-categoria'}`}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    {category.name}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    );
};

export default Categorias;