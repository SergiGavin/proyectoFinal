
import React from "react"
import Categorias from "../../Componentes/Categorias/Categorias"
import Footer from "../../Componentes/Footer/Footer"
import Sugerencias from "../../Componentes/Sugerencias/Sugerencias"
import HeaderLoged from "../../Componentes/Header/HeaderLoged"


function Home() {
    return (
        <>
            <HeaderLoged />
            <Categorias num={0} />
            <Sugerencias />
            <Footer />
        </>

    )
}

export default Home