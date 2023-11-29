import React, { useState } from 'react';

const Book = () => {
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        imageUrl: '',
    });

    // useEffect para obtener los datos del libro, descomenta esto si lo necesitas
    // useEffect(() => {
    //   fetch(`/books/${book.id}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setBook(data);
    //     })
    //     .catch((error) => {
    //       console.error('Error al obtener los datos del libro:', error);
    //     });
    // }, []);
};

const Libro = () => {
    return (
        <div className="card">
            <img src="images\book.png" className="card-img-top img-fluid tamano" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Yumi y noeque</h5>
                    <p className="card-text">Brandon Sanderson</p>
                </div>
        </div>
    );
};

export default Libro;