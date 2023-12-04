import "./Libro.css"

const LibroBase = ({ libro }: { libro: any }) => {
    return (
        <div className="card texto-morado">
            <img src={libro.foto_portada} className="card-img-top img-fluid contenedor-imagen" alt={libro.titulo} />
            <div className="card-body">
                <h5 className="texto-morado">{libro.titulo}</h5>
                <p className="texto-morado">{libro.autor}</p>
                {/* Otros campos del libro */}
            </div>
        </div>
    );
};

export default LibroBase;