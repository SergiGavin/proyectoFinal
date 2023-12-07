import { Routes, Route } from 'react-router-dom';
import Home from './Paginas/Home/Home';
import Login from './Paginas/Login/Login';
import Register from './Paginas/NuevaCuenta/registro';
import Fantasia from './Paginas/Filtro/Fantasia';
import Clasica from './Paginas/Filtro/Clasica';
import Drama from './Paginas/Filtro/Drama';
import Ficcion from './Paginas/Filtro/Ficcion';
import Historica from './Paginas/Filtro/Historica';
import Infantil from './Paginas/Filtro/Infantil';
import Policiaca from './Paginas/Filtro/Policiaca';
import Romance from './Paginas/Filtro/Romance';
import Terror from './Paginas/Filtro/Terror';
import Todos from './Paginas/Filtro/Todos';
import React from 'react';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/clasica' element={<Clasica />} />
            <Route path='/drama' element={<Drama />} />
            <Route path='/fantasia' element={<Fantasia />} />
            <Route path='/ficcion' element={<Ficcion />} />
            <Route path='/historica' element={<Historica />} />
            <Route path='/infantil' element={<Infantil />} />
            <Route path='/policiaca' element={<Policiaca />} />
            <Route path='/romance' element={<Romance />} />
            <Route path='/terror' element={<Terror />} />
            <Route path='/todos' element={<Todos />} />
        </Routes>
    );
}
    
export default AppRoutes;
