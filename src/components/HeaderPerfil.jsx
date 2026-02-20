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
`

const HeaderContent = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`

const HeaderText = styled(Link)`
  font-size: 18px;
  font-weight: 900;
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
`

const Logo = styled.img`
  width: 125px;
`

export default function HeaderPerfil({ onOpenCart, cartCount }) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderText to="/">Restaurantes</HeaderText>
        <Link to="/">
          <Logo src={logo} alt="efood" />
        </Link>
        {/* Este texto abrirá o side menu do carrinho no futuro */}
        <HeaderText as="span" style={{ cursor: 'pointer' }} onClick={onOpenCart}>
          {cartCount} produto(s) no carrinho
        </HeaderText>
      </HeaderContent>
    </HeaderContainer>
  )
}