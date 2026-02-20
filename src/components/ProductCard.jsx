import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  background-color: ${p => p.theme.colors.primary}; // Fundo salmão
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ProductImage = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  cursor: pointer;
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 900;
  color: ${p => p.theme.colors.background}; // Texto em creme
  margin: 8px 0;
`

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${p => p.theme.colors.background}; // Texto em creme
  margin-bottom: 8px;
  flex-grow: 1; /* Garante que o botão fique sempre no rodapé do card */
`

const AddButton = styled.button`
  background-color: ${p => p.theme.colors.background}; // Botão creme
  color: ${p => p.theme.colors.primary}; // Texto salmão
  font-weight: 900;
  font-size: 14px;
  border: none;
  padding: 4px 0;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

export default function ProductCard({ item, onOpenModal }) {
  // Função para limitar o texto da descrição no card principal
  const getShortDescription = (desc) => {
    if (desc.length > 135) return desc.slice(0, 132) + '...'
    return desc
  }

  return (
    <CardContainer>
      {/* Clicar na imagem ou no botão abrirá o modal conforme o Figma */}
      <ProductImage 
        src={item.image} 
        alt={item.name} 
        onClick={onOpenModal} 
      />
      <Title>{item.name}</Title>
      <Description>{getShortDescription(item.description)}</Description>
      <AddButton onClick={onOpenModal}>
        Adicionar ao carrinho
      </AddButton>
    </CardContainer>
  )
}