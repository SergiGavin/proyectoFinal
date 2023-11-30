import React from 'react';
import "./Categorias.css"
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

const Categorias: React.FC = () => {
    const categories: Category[] = [
        { id: 1, name: 'Ficción' },
        { id: 2, name: 'Ciencia Ficción' },
        { id: 3, name: 'Misterio' },
        { id: 4, name: 'Fantasía' },
        { id: 5, name: 'Amor' },
        { id: 6, name: 'Policiaca' },
        // Asegúrate de importar las imágenes correspondientes aquí
    ];

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        // Aquí podrías realizar la búsqueda en la base de datos con el ID seleccionado
        // fetch, axios, u otro método para llamar a la base de datos
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