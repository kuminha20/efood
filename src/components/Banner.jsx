import React from 'react'
import styled from 'styled-components'

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background-image: url(${p => p.$bgImage});
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Máscara escura */
  }
`

const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px 32px;
`

const Categoria = styled.p`
  font-size: 32px;
  font-weight: 100;
  color: #FFFFFF;
  margin: 0;
`

const NomeRestaurante = styled.h2`
  font-size: 32px;
  font-weight: 900;
  color: #FFFFFF;
  margin: 0;
`

export default function Banner({ image, category, name }) {
  return (
    <BannerContainer $bgImage={image}>
      <BannerContent>
        <Categoria>{category}</Categoria>
        <NomeRestaurante>{name}</NomeRestaurante>
      </BannerContent>
    </BannerContainer>
  )
}