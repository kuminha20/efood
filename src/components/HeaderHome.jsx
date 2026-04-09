import styled from 'styled-components'
import logo from '../assets/efood-logo.png'
import fundo from '../assets/fundo.png'

const HeaderContainer = styled.header`
  background-color: ${p => p.theme.colors.secondary};
  background-image: url(${fundo});
  height: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 64px;

  @media (max-width: 768px) {
    height: 280px;
    padding: 32px 20px;
  }
`

const Title = styled.h1`
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: ${p => p.theme.colors.primary};
  max-width: 540px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 30px;
  }
`

export default function HeaderHome() {
  return (
    <HeaderContainer>
      <img src={logo} alt="efood" />
      <Title>
        Viva experiências gastronômicas no conforto da sua casa
      </Title>
    </HeaderContainer>
  )
}