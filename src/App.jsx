import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// Importações das páginas
import Home from './pages/Home'
import Perfil from './pages/Perfil'

// Importações globais
import GlobalStyle from './styles/globalStyles'
import { lightTheme } from './styles/theme'
import Cart from './components/Cart'

export default function App() {
  const [restaurantes, setRestaurantes] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  // Chamada AJAX (Fetch API) para buscar os dados
  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch((err) => console.error("Erro ao carregar restaurantes:", err))
  }, [])

  const addToCart = (item) => {
    // Adiciona o cartId para garantir que cada item no carrinho seja único
    const itemWithUniqueId = { ...item, cartId: Math.random() }
    setCartItems((prev) => [...prev, itemWithUniqueId])
    setIsCartOpen(true)
  }

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId))
  }

  // Se a API ainda não respondeu, mostramos uma tela de carregamento para evitar erros de 'undefined'
  if (restaurantes.length === 0) {
    return <div style={{ color: '#E66767', textAlign: 'center', marginTop: '100px' }}>Carregando...</div>
  }

  return (
    <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Cart 
          items={cartItems} 
          onRemove={removeFromCart} 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        <Routes>
          <Route path="/" element={<Home restaurantes={restaurantes} />} />
          <Route 
            path="/perfil/:id" 
            element={
              <Perfil 
                restaurantes={restaurantes} 
                cartCount={cartItems.length} 
                onOpenCart={() => setIsCartOpen(true)}
                onAddToCart={addToCart} 
              />
            } 
          />
        </Routes>
    </ThemeProvider>
  )
}