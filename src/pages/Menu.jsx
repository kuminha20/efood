import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import items from '../data/items'

const Container = styled.main`
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
`

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

const TwoColGrid = styled(Grid)`
  grid-template-columns: repeat(2, 1fr);
`

export default function Menu() {
  return (
    <Container>
      <h2>Restaurantes</h2>
      <p>Descubra restaurantes e pratos selecionados para você.</p>
      <TwoColGrid>
        {items.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </TwoColGrid>
    </Container>
  )
}
