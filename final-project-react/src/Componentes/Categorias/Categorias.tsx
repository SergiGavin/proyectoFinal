import React from 'react';
import "./Categorias.css"
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const Categorias: React.FC = () => {
    const navigate = useNavigate(); 

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
            navigate("/clasica");
        } else if (categoryId === 2) {
            navigate("/drama");
        } else if (categoryId === 3) {
            navigate("/ficcion");
        } else if (categoryId === 4) {
            navigate("/fantasia");
        } else if (categoryId === 5) {
            navigate("/historica");
        } else if (categoryId === 6) {
            navigate("/policiaca");
        } else if (categoryId === 7) {
            navigate("/infantil");
        } else if (categoryId === 8) {
            navigate("/romance");
        } else if (categoryId === 9) {
            navigate("/terror");
        }
        else if (categoryId === 10) {
            navigate("/todos");
        }
        else if (categoryId === 11) {
            navigate("/random");
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