import React from 'react'
import styled from 'styled-components'
import logo from '../assets/efood-logo.png'
import fundo from '../assets/fundo.png' // A textura vetorial

const HeroContainer = styled.header`
  background-color: ${p => p.theme.colors.secondary};
  background-image: url(${fundo});
  height: 384px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  text-align: center;
`

const Logo = styled.img`
  width: 125px;
`

const Title = styled.h1`
  font-size: 34px;
  font-weight: 900;
  line-height: 42px;
  color: ${p => p.theme.colors.primary};
  max-width: 540px;
  margin-bottom: 20px;
`

export default function Hero() {
  return (
    <HeroContainer>
      <Logo src={logo} alt="efood" />
      <Title>Viva experiências gastronômicas no conforto da sua casa</Title>
    </HeroContainer>
  )
}