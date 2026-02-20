import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Adicionei BrowserRouter aqui
import { ThemeProvider } from 'styled-components'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Perfil from './pages/Perfil'
import GlobalStyle from './styles/globalStyles'
import { lightTheme } from './styles/theme'
import Cart from './components/Cart'

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  // 1. Adicionar ao carrinho com um ID único para cada instância do item
const addToCart = (item) => {
  // Criamos um novo objeto com as mesmas propriedades, mas com um cartId único
  const itemWithUniqueId = { 
    ...item, 
    cartId: Math.random() // Gera um ID temporário único para esta "unidade" no carrinho
  }
  
  // Usamos (prev) => ... para garantir que pegamos o estado mais atualizado
  setCartItems((prevItems) => [...prevItems, itemWithUniqueId])
  setIsCartOpen(true)
}

// 2. Remover usando o cartId único
const removeFromCart = (cartId) => {
  setCartItems((prevItems) => 
    prevItems.filter((item) => item.cartId !== cartId)
  )
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
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/perfil/:id"
        element={
          <Perfil
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