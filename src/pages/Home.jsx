import HeaderHome from '../components/HeaderHome'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import styled from 'styled-components'

const Container = styled.main`
  max-width: 1024px;
  width: 100%;
  margin: 80px auto;
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 48px;

@media (max-width: 1024px) {
    padding: 0 40px;
    column-gap: 40px; /* Reduz espaço entre colunas em tablets */
    margin: 40px auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 coluna no mobile */
    padding: 0 20px;
    row-gap: 32px;
  }
`

export default function Home({ restaurantes }) {
  return (
    <>
      <HeaderHome />
      <Container>
        {restaurantes.map((res) => (
          <ProductCard key={res.id} res={res} />
        ))}
      </Container>
      <Footer />
    </>
  )
}