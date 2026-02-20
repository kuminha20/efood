import React from 'react'
import styled from 'styled-components'
import starIcon from '../assets/estrela.png' // Certifique-se de ter este ícone ou use um SVG
import { Link } from 'react-router-dom'

const CardContainer = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.primary}; /* Borda vista no design */
  position: relative;
  margin-bottom: 48px;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 217px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

const Tag = styled.span`
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  padding: 6px 10px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
`

const Content = styled.div`
  padding: 8px;
  border-top: 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: ${p => p.theme.colors.primary};
  }
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: ${p => p.theme.colors.primary};
  
  img {
    width: 21px;
  }
`

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${p => p.theme.colors.primary}; //* O texto parece ser da cor primária ou cinza escuro */
  margin-bottom: 16px;
`

const Button = styled(Link)`
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  padding: 4px 6px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  border: none;
  cursor: pointer;
`

export default function Card({ item }) {
  return (
    <CardContainer>
      <ImageContainer>
        <img src={item.image} alt={item.name} />
        <Tags>
          {item.highlight && <Tag>Destaque da semana</Tag>}
          <Tag>{item.tag}</Tag>
        </Tags>
      </ImageContainer>
      <Content>
        <Header>
          <h3>{item.name}</h3>
          <Rating>
            {item.rating} <img src={starIcon} alt="estrela" />
          </Rating>
        </Header>
        <Description>{item.description}</Description>
        <Button to={`/perfil/${item.id}`}>Saiba mais</Button>
      </Content>
    </CardContainer>
  )
}