import React from 'react'
import styled from 'styled-components'
// Importe o Header que você já tem (se for HeaderPerfil ou outro, ajuste o nome)
import HeaderPerfil from '../components/HeaderPerfil' 
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const Container = styled.main`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 48px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

export default function Home({ restaurantes }) {
  return (
    <>
      {/* Usando o Header que você já tem para evitar erro de importação */}
      <HeaderPerfil cartCount={0} /> 
      <Container>
        <Grid>
          {restaurantes.map((res) => (
            <ProductCard 
              key={res.id}
              id={res.id}
              titulo={res.titulo}
              capa={res.capa}
              descricao={res.descricao}
              isRestaurante={true} 
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}