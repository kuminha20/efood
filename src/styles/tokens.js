const tokens = {
  colors: {
    primary: '#E66767', // Salmão principal
    secondary: '#FFEBD9', // Salmão claro (fundo do footer/hero)
    background: '#FFF8F2', // Creme claro (fundo da página)
    surface: '#FFFFFF',
    text: '#4B2995', // Cor do texto dos títulos (estimada) ou #E66767
    textBody: '#4B2995', // Ajuste para cinza escuro se preferir
    white: '#FFFFFF'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '80px' // Para espaçamento de seções
  },
  fonts: {
    body: '"Roboto", sans-serif', // O design parece usar Roboto
    title: '"Roboto", sans-serif'
  },
  radii: {
    sm: '0px', // O design é mais quadrado em alguns pontos
    md: '0px', // Cards parecem não ter bordas arredondadas ou muito sutis?
    // Observando a imagem Home.png, os cards têm borda branca e cantos levemente ou nada arredondados.
    // Vamos manter 0 ou 8px dependendo da preferência, mas o design parece ter 0px nos botões.
    card: '0px'
  }
}

export default tokens