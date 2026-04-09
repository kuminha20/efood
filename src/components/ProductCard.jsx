import { Link } from 'react-router-dom'
import styled from 'styled-components'
import estrela from '../assets/estrela.png'

const CardContainer = styled.div`
  background-color: #FFF;
  border: 1px solid ${p => p.theme.colors.primary};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`

const TagContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

const Tag = styled.div`
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.secondary};
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
`

const Content = styled.div`
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Se for item do cardápio, fundo fica escuro (primary), se for restaurante, fica branco */
  background-color: ${p => p.$isItem ? p.theme.colors.primary : '#FFF'};
  color: ${p => p.$isItem ? p.theme.colors.background : p.theme.colors.primary};
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  h3 { font-size: 18px; font-weight: 900; }
  span { font-weight: 700; font-size: 18px; }
`

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin: 8px 0;
`

// BOTÃO CORRIGIDO: Cores claras para o fundo e escuras para o texto
const ActionButton = styled.button`
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: none;
  padding: 4px 6px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-top: auto;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`

const StyledLink = styled(Link)`
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.secondary};
  padding: 4px 6px;
  font-weight: 700;
  display: inline-block;
  width: fit-content;
`

export default function ProductCard({ res, item, isRestaurante = true, onOpenModal }) {
  if (isRestaurante) {
    return (
      <CardContainer>
        <CardImage src={res.capa} alt={res.titulo} />
        <TagContainer>
          {res.destacado && <Tag>Destaque da semana</Tag>}
          <Tag>{res.tipo}</Tag>
        </TagContainer>
        <Content $isItem={false}>
          <TitleContainer>
            <h3>{res.titulo}</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span>{res.avaliacao}</span>
              <img src={estrela} alt="estrela" />
            </div>
          </TitleContainer>
          <Description>{res.descricao}</Description>
          <StyledLink to={`/perfil/${res.id}`}>Saiba mais</StyledLink>
        </Content>
      </CardContainer>
    )
  }

  return (
    <CardContainer style={{border: 'none', background: 'none'}}>
      <div style={{padding: '8px', background: '#E66767'}}>
        <CardImage src={item.foto} alt={item.nome} style={{height: '167px'}} />
        <Content $isItem={true} style={{padding: '8px 0'}}>
          <h3 style={{fontSize: '16px'}}>{item.nome}</h3>
          <Description style={{fontSize: '14px'}}>
            {item.descricao.length > 130 ? item.descricao.substring(0, 130) + "..." : item.descricao}
          </Description>
          <ActionButton onClick={onOpenModal}>Adicionar ao carrinho</ActionButton>
        </Content>
      </div>
    </CardContainer>
  )
}