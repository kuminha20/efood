import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Home from './pages/Home'
import Perfil from './pages/Perfil'
import GlobalStyle from './styles/globalStyles'
import { lightTheme } from './styles/theme'
import Cart from './components/Cart'

export default function App() {
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch((err) => console.error("Erro:", err))
  }, [])

  if (restaurantes.length === 0) {
    return <div style={{ color: '#E66767', textAlign: 'center', marginTop: '100px' }}>Carregando...</div>
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {/* O Cart agora não precisa de props, ele lê o Redux sozinho */}
      <Cart /> 
      <Routes>
        <Route path="/" element={<Home restaurantes={restaurantes} />} />
        <Route path="/perfil/:id" element={<Perfil restaurantes={restaurantes} />} />
      </Routes>
    </ThemeProvider>
  )
}