import "./Header.css"

function Header() {
    return (
        <>
                <div className="row fndo-naranja">
                    <div className="col-3">
                        <p className="nombre mt-3">SwapReads</p>
                    </div>
                    <div className="col-6">
                    <div className="input-group mb-3 mt-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Buscar</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    </div>
                    <div className="col-3">
                        <button type="button" className="btn btn-inicioSesion btn-hover">Inicio sesión</button>
                    </div>

                </div>

        </>
    )
}

export default Header