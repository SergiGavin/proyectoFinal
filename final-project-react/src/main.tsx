import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import { BrowserRouter, Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'

ReactDOM.render(
<React.StrictMode>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</React.StrictMode>, document.getElementById('root'));


