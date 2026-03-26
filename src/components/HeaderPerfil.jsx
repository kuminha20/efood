import { useSelector, useDispatch } from 'react-redux'
import { toggleCart } from '../store/cartSlice'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/efood-logo.png'
import fundo from '../assets/fundo.png'

const HeaderContainer = styled.header`
  background-color: ${p => p.theme.colors.secondary};
  background-image: url(${fundo});
  height: 186px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: 160px; /* Diminui a altura no mobile para ganhar espaço */
  }
`

const HeaderContent = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    /* No mobile muito pequeno, podemos empilhar ou reduzir o texto */
    gap: 5px;
  }
`

const HeaderText = styled(Link)`
  font-size: 18px;
  font-weight: 900;
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
  width: 33%; /* Garante espaço igual para os lados */

  &:last-child {
    text-align: right; /* Alinha o carrinho à direita */
  }

  @media (max-width: 768px) {
    font-size: 14px; /* Diminui a fonte para não quebrar linha */
  }

  @media (max-width: 480px) {
    font-size: 12px;
    /* Se o texto "Restaurantes" for muito grande, podemos ocultá-lo 
       ou abreviá-lo para manter o design limpo */
  }
`

const Logo = styled.img`
  width: 125px;
  
  @media (max-width: 768px) {
    width: 100px; /* Logo menor no mobile */
  }
`

export default function HeaderPerfil() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderText to="/">Restaurantes</HeaderText>
        <Link to="/">
          <Logo src={logo} alt="efood" />
        </Link>
        {/* O onClick agora dispara a ação do Redux corretamente */}
        <HeaderText 
  as="span" 
  style={{ cursor: 'pointer', textAlign: 'right' }} 
  onClick={() => dispatch(toggleCart())}
>
  {/* No mobile, podemos mostrar apenas o ícone ou encurtar o texto */}
  {items.length} <span className="mobile-hide">produto(s)</span>
</HeaderText>
      </HeaderContent>
    </HeaderContainer>
  )
}