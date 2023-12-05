
import React from "react"
import Categorias from "../../Componentes/Categorias/Categorias"
import Footer from "../../Componentes/Footer/Footer"
import Header from "../../Componentes/Header/Header"
import Sugerencias from "../../Componentes/Sugerencias/Sugerencias"
import Navbar from "../../Componentes/Header/Navbar"


function Home() {
    return (
        <>
            <Navbar />
            <Categorias />
            <Sugerencias />
            <Footer />
        </>

    )
}

export default Home