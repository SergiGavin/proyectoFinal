import "./Header.css"

function Header() {
    return (
    <>
        <div className="row fndo-naranja">
            <div className="col-4">
                <div className="logo"><p>SwapReads</p></div>
            </div>
            <div className="col-6">
                <div className="buscador"></div>
            </div>
            <div className="col">
                <button type="button" className="btn btn-inicioSesion btn-hover">Inicio sesión</button>
            </div>

        </div>
    </>
    )
}

export default Header