import React from 'react'
import styled from 'styled-components'
import logo from '../assets/efood-logo.png'
import insta from '../assets/instagram-logo.png'
import vec from '../assets/facebook-logo.png'
import twitter from '../assets/twitter-logo.png'

const Foot = styled.footer`
  margin-top: 48px;
  padding: 24px 16px;
  text-align: center;
  color: #9ca3af;
  background: ${p => p.theme.colors.background};
  border-top: 1px solid rgba(0,0,0,0.03);
`
const LogoImg = styled.img`
  height: 58px;
  margin-bottom: 12px;
`
const Socials = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
`
const Icon = styled.img`
  height: 22px;
  opacity: 0.85;
`
const Copyright = styled.div`
  margin-top: 12px;
  color: ${p => p.theme.colors.secondary};
`
export default function Footer() {
  return (
    <Foot>
      <LogoImg src={logo} alt="efood" />
      <Socials>
        <Icon src={insta} alt="instagram" />
        <Icon src={vec} alt="facebook" />
        <Icon src={twitter} alt="twitter" />
      </Socials>
      <Copyright>© {new Date().getFullYear()} efood</Copyright>
    </Foot>
  )
}
