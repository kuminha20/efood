import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../store/cartSlice'
import styled from 'styled-components'

// Importe seus componentes
import HeaderPerfil from '../components/HeaderPerfil'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

// Estilização necessária para esta página
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
  z-index: 1000;
  padding: 20px;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer; /* Feedback visual que o overlay fecha o modal */
  }
`

const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${p => p.theme.colors.primary};
  color: #fff;
  padding: 32px;
  max-width: 1024px;
  width: 100%;
  display: flex;
  gap: 24px;
  
  /* Lógica de Rolagem Responsiva */
  max-height: 90vh; /* Não deixa o modal ser maior que a tela */
  overflow-y: auto; /* Ativa a rolagem interna */

  @media (max-width: 768px) {
    /* No mobile, inverte a ordem: imagem fica embaixo do texto e botão de fechar */
    flex-direction: column-reverse; 
    padding: 16px;
    gap: 16px;
  }
`

// --- O BOTÃO DE FECHAR (X) FLUTUANTE ---
const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px; /* Aumentado para mobile */
  font-weight: bold;
  color: #fff;
  padding: 12px; /* Área de toque maior (importante para smartphones) */
  line-height: 1;
  z-index: 10; /* Garante que fique acima da imagem */

  @media (max-width: 768px) {
    top: 0;
    right: 0;
    color: ${p => p.theme.colors.background}; /* Cor de contraste (ex: creme) no mobile */
    font-size: 28px;
    padding: 16px; /* Área de toque ainda maior no mobile */
  }

  &:hover {
    opacity: 0.7;
  }
`

const ModalImg = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 180px; /* Diminui a imagem no mobile */
    margin-top: 16px; /* Espaço para o botão 'X' não sobrepor no mobile */
  }
`

const AddToCartBtn = styled.button`
  background-color: ${p => p.theme.colors.background}; /* Cor clara do fundo */
  color: ${p => p.theme.colors.primary};              /* Cor escura do texto */
  border: none;
  padding: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
  width: fit-content; /* No mobile ele vira 100% por causa da media query que já temos */
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%; 
  }

  &:hover {
    opacity: 0.8;
  }
`

export default function Perfil({ restaurantes }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Busca o restaurante
  const restaurant = restaurantes.find(r => String(r.id) === id)

  // Se não achar o restaurante (carregando ou ID errado), retorna nulo para não quebrar
  if (!restaurant) return null

  const menuItems = restaurant.cardapio || []

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  return (
    <>
      <HeaderPerfil /> 
      <Banner image={restaurant.capa} name={restaurant.titulo} category={restaurant.tipo} />
      
      <Container>
        <Grid>
          {menuItems.map((prato) => (
            <ProductCard 
              key={prato.id} 
              item={prato} 
              isRestaurante={false}
              onOpenModal={() => setSelectedProduct(prato)} 
            />
          ))}
        </Grid>
      </Container>

      <Modal $isOpen={!!selectedProduct}>
        <div className="overlay" onClick={() => setSelectedProduct(null)} />
        {selectedProduct && (
          <ModalContent>
            <CloseButton onClick={() => setSelectedProduct(null)}>X</CloseButton>
            <ModalImg src={selectedProduct.foto} alt={selectedProduct.nome} />
            <div>
              <h2>{selectedProduct.nome}</h2>
              <br />
              <p>{selectedProduct.descricao}</p>
              <br />
              <p>Serve: {selectedProduct.porcao}</p>
              <AddToCartBtn onClick={() => {
                dispatch(add(selectedProduct))
                setSelectedProduct(null)
              }}>
                Adicionar ao carrinho - {formatPrice(selectedProduct.preco)}
              </AddToCartBtn>
            </div>
          </ModalContent>
        )}
      </Modal>
      <Footer />
    </>
  )
}