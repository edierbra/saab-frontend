import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { SaabApp } from './SaabApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SaabApp />
    </BrowserRouter>
  </React.StrictMode>,
)
