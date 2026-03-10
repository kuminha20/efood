import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Estilização baseada no seu projeto
const CardContainer = styled.div`
  background-color: ${p => p.theme.colors.primary};
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`

const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`

const Content = styled.div`
margin-top: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;

  h3 {
    font-size: 16px;
    font-weight: 900;
    color: ${p => p.theme.colors.background};
  }

  p {
    font-size: 14px;
    line-height: 22px;
    color: ${p => p.theme.colors.background};
    margin: 8px 0;
  }
`

const CardButton = styled.button`
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: none;
  padding: 4px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  text-align: center;
  margin-top: auto;
`

const StyledLink = styled(Link)`
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  padding: 4px 6px;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  width: fit-content;
`

export default function ProductCard({ item, isRestaurante, ...props }) {
  // Lógica para diferenciar Restaurante (Home) de Prato (Perfil)
  const titulo = isRestaurante ? props.titulo : item.nome
  const imagem = isRestaurante ? props.capa : item.foto
  const descricao = isRestaurante ? props.descricao : item.descricao

  return (
    <CardContainer>
      <CardImage src={imagem} alt={titulo} />
      
      <Content>
        <h3>{titulo}</h3>
        <p>
          {descricao.length > 130 
            ? descricao.substring(0, 130) + "..." 
            : descricao}
        </p>
        
        {isRestaurante ? (
          // Se for restaurante, renderiza um Link para a página de perfil
          <StyledLink to={`/perfil/${props.id}`}>Saiba mais</StyledLink>
        ) : (
          // Se for prato, renderiza o botão que abre o modal
          <CardButton onClick={props.onOpenModal}>
            Adicionar ao carrinho
          </CardButton>
        )}
      </Content>
    </CardContainer>
  )
}