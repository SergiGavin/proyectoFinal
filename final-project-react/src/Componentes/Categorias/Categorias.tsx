import React from 'react';
import "./Categorias.css"
import { useState } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const Categorias: React.FC = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const id_usuarios = location.state?.id_usuarios;
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
        { id: 10, name: 'TODOS' },
        { id: 11, name: 'RANDOM' }
        // Asegúrate de importar las imágenes correspondientes aquí
    ];

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        if (categoryId === 1) {
            navigate(`/clasica`, { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 2) {
            navigate("/drama", { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 3) {
            navigate("/ficcion", { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 4) {
            navigate("/fantasia", { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 5) {
            navigate("/historica", { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 6) {
            navigate("/policiaca", { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 7) {
            navigate("/infantil", { state: { id_usuarios: id_usuarios} });
        } else if (categoryId === 8) {
            navigate("/romance");
        } else if (categoryId === 9) {
            navigate("/terror", { state: { id_usuarios: id_usuarios} });
        }
        else if (categoryId === 10) {
            navigate("/todos", { state: { id_usuarios: id_usuarios} });
        }
        else if (categoryId === 11) {
            navigate("/random", { state: { id_usuarios: id_usuarios} });
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg nav-bar-bg mx-5">
                <div className="buttons-container">
                    {categories.map((category) => (
                        <button key={category.id} className={`btn px-5 btn-textcolor ${selectedCategoryId === category.id ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category.id)}>
                            {category.name}
                        </button>
                    ))}
                </div>
            </nav>

        </div>
    );
};

export default Categorias;