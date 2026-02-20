import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  
  body {
    margin: 0;
    font-family: ${p => p.theme.fonts.body};
    background: ${p => p.theme.colors.background};
    color: ${p => p.theme.colors.textBody};
    -webkit-font-smoothing: antialiased;
  }
  
  a { text-decoration: none; color: inherit; }
  ul { list-style: none; padding: 0; margin: 0; }
`

export default GlobalStyle