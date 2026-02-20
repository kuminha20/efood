import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import HeaderPerfil from '../components/HeaderPerfil'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import items from '../data/items'

const Container = styled.main`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 56px 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${p => (p.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 100;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
`

const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${p => p.theme.colors.primary};
  color: #fff;
  padding: 32px;
  max-width: 1024px;
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px;
  }
`

const ModalImg = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
`

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 8px;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`

const AddToCartBtn = styled.button`
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: none;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
`

export default function Perfil({ onAddToCart, cartCount, onOpenCart }) {
  const { id } = useParams()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const restaurant = items.find(i => String(i.id) === id)
  const menuItems = restaurant?.menu || [] 

  return (
    <>
      <HeaderPerfil onOpenCart={onOpenCart} cartCount={cartCount} />
      
      {restaurant && (
        <Banner 
          image={restaurant.image} 
          category={restaurant.tag} 
          name={restaurant.name} 
        />
      )}

      <Container>
        <Grid>
          {menuItems.map((prato) => (
            <ProductCard 
              key={prato.id} 
              item={prato} 
              onOpenModal={() => setSelectedProduct(prato)} 
            />
          ))}
        </Grid>
      </Container>

      <Footer />

      <Modal $isOpen={!!selectedProduct}>
        <div className="overlay" onClick={() => setSelectedProduct(null)} />
        {selectedProduct && (
          <ModalContent>
            {/* Usando o CloseButton que definimos como div/texto aqui */}
            <CloseButton onClick={() => setSelectedProduct(null)}>X</CloseButton>
            
            <ModalImg src={selectedProduct.image} alt={selectedProduct.name} />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '900' }}>{selectedProduct.name}</h2>
              <p style={{ marginTop: '16px', lineHeight: '22px', fontSize: '14px' }}>
                {selectedProduct.description}
              </p>
              <p style={{ marginTop: '16px', fontSize: '14px' }}>{selectedProduct.portion}</p>
              <AddToCartBtn 
  onClick={() => {
    onAddToCart(selectedProduct); // Envia o produto para o estado do App.jsx
    setSelectedProduct(null);    // Fecha o modal para mostrar o carrinho
  }}
>
  Adicionar ao carrinho - {selectedProduct.price}
</AddToCartBtn>
            </div>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}