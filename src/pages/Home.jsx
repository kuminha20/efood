import React from 'react'
import styled from 'styled-components'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Card from '../components/Card'
import items from '../data/items'

const Container = styled.main`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Design mostra 2 colunas */
  column-gap: 80px;
  row-gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <Grid>
          {items.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}