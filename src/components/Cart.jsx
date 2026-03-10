import React, { useState } from 'react'
import styled from 'styled-components'

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${p => (p.$isOpen ? 'flex' : 'none')};
  justify-content: flex-end;
  z-index: 200;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
`

const Sidebar = styled.aside`
  background-color: ${p => p.theme.colors.primary};
  z-index: 1;
  padding: 32px 8px;
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const CartItem = styled.div`
  background-color: ${p => p.theme.colors.background};
  display: flex;
  padding: 8px;
  margin-bottom: 16px;
  position: relative;
  
  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  h3 { font-size: 18px; font-weight: 900; color: ${p => p.theme.colors.primary}; }
  p { font-size: 14px; color: ${p => p.theme.colors.primary}; margin-top: 8px; }
`

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${p => p.theme.colors.background};
  font-weight: 700;
  margin: 40px 0 16px;
`

const FormTitle = styled.h3`
  color: ${p => p.theme.colors.background};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`

const InputGroup = styled.div`
  margin-bottom: 8px;
  label {
    display: block;
    color: ${p => p.theme.colors.background};
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  input {
    width: 100%;
    background-color: ${p => p.theme.colors.background};
    border: none;
    padding: 8px;
    color: #4B4B4B;
    font-size: 14px;
    font-weight: 700;
  }
`

const PrimaryButton = styled.button`
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: none;
  padding: 4px;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  margin-top: 8px;
`

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${p => p.theme.colors.background};
`

const ConfirmationText = styled.p`
  color: ${p => p.theme.colors.background};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 24px;
`

export default function Cart({ isOpen, onClose, items, onRemove }) {
  const [step, setStep] = useState('cart')

  // --- O CORRETOR DO ERRO ESTÁ AQUI ---
  // A API envia 'preco' como número. Não usamos mais .replace()!
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item.preco || 0)
  }, 0)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  const handleClose = () => {
    setStep('cart')
    onClose()
  }

  return (
    <CartContainer $isOpen={isOpen}>
      <div className="overlay" onClick={handleClose} />
      <Sidebar>
        
        {step === 'cart' && (
          <>
            {items.map((item) => (
              <CartItem key={item.cartId}> 
                <img src={item.foto} alt={item.nome} /> 
                <div>
                  <h3>{item.nome}</h3>
                  <p>{formatPrice(item.preco)}</p>
                </div>
                <button 
                  onClick={() => onRemove(item.cartId)} 
                  style={{ position: 'absolute', right: 8, bottom: 8, border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  🗑️
                </button>
              </CartItem>
            ))}
            
            {items.length > 0 ? (
              <>
                <TotalPrice>
                  <span>Valor total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </TotalPrice>
                <PrimaryButton onClick={() => setStep('delivery')}>
                  Continuar com a entrega
                </PrimaryButton>
              </>
            ) : (
              <p style={{ color: '#fff', textAlign: 'center' }}>Seu carrinho está vazio.</p>
            )}
          </>
        )}

        {step === 'delivery' && (
          <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}>
            <FormTitle>Entrega</FormTitle>
            <InputGroup>
              <label htmlFor="receiver">Quem irá receber</label>
              <input id="receiver" type="text" required />
            </InputGroup>
            <InputGroup>
              <label htmlFor="address">Endereço</label>
              <input id="address" type="text" required />
            </InputGroup>
            <div style={{ marginTop: '24px' }}>
              <PrimaryButton type="submit">Continuar para o pagamento</PrimaryButton>
              <SecondaryButton type="button" onClick={() => setStep('cart')}>Voltar para o carrinho</SecondaryButton>
            </div>
          </form>
        )}

        {step === 'payment' && (
          <form onSubmit={(e) => { e.preventDefault(); setStep('confirmation'); }}>
            <FormTitle>Pagamento - Valor a pagar {formatPrice(totalPrice)}</FormTitle>
            <InputGroup>
              <label>Nome no cartão</label>
              <input type="text" required />
            </InputGroup>
            <div style={{ marginTop: '24px' }}>
              <PrimaryButton type="submit">Finalizar pagamento</PrimaryButton>
              <SecondaryButton type="button" onClick={() => setStep('delivery')}>Voltar para o endereço</SecondaryButton>
            </div>
          </form>
        )}

        {step === 'confirmation' && (
          <>
            <FormTitle>Pedido realizado!</FormTitle>
            <ConfirmationText>
              Estamos felizes em informar que seu pedido já está em processo de preparação...
            </ConfirmationText>
            <PrimaryButton onClick={handleClose}>Concluir</PrimaryButton>
          </>
        )}
      </Sidebar>
    </CartContainer>
  )
}