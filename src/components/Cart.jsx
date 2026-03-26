import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { remove, toggleCart, clear } from '../store/cartSlice'

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
    background: rgba(0, 0, 0, 0.7);
  }
`

const Sidebar = styled.aside`
  background-color: ${p => p.theme.colors.primary};
  z-index: 1;
  padding: 32px 16px;
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 80%; /* Ajuste para tablets */
  }

  @media (max-width: 480px) {
    max-width: 90%; /* Ajuste para smartphones */
    padding: 24px 12px;
  }
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
    min-width: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  div {
    h3 { font-size: 16px; font-weight: 900; color: ${p => p.theme.colors.primary}; }
    p { font-size: 14px; color: ${p => p.theme.colors.primary}; margin-top: 8px; }
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${p => p.theme.colors.background};

  label {
    font-size: 14px;
    font-weight: 700;
    margin-top: 8px;
  }

  input {
    background-color: ${p => p.theme.colors.background};
    border: none;
    padding: 8px;
    height: 32px;
    font-weight: 700;
    width: 100%;
    color: #4b4b4b;
  }

  .field-group {
    display: flex;
    gap: 20px;
    div { width: 100%; }

    @media (max-width: 480px) {
      flex-direction: column; /* Empilha campos no mobile */
      gap: 0;
    }
  }
`

const PrimaryButton = styled.button`
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: none;
  padding: 12px;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  margin-top: 16px;
  font-size: 14px;

  &:hover { opacity: 0.9; }
`

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${p => p.theme.colors.background};
  margin-top: 8px;
`

export default function Cart() {
  const { items, isOpen } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [step, setStep] = useState('cart')

  const totalPrice = items.reduce((acc, item) => acc + (item.preco || 0), 0)
  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  if (!isOpen) return null

  return (
    <CartContainer $isOpen={isOpen}>
      <div className="overlay" onClick={() => dispatch(toggleCart())} />
      <Sidebar>
        {step === 'cart' && (
          <>
            <h3 style={{color: '#fff', marginBottom: '16px'}}>Carrinho</h3>
            {items.map((item) => (
              <CartItem key={item.cartId}>
                <img src={item.foto} alt={item.nome} />
                <div>
                  <h3>{item.nome}</h3>
                  <p>{formatPrice(item.preco)}</p>
                </div>
                <button onClick={() => dispatch(remove(item.cartId))}>🗑️</button>
              </CartItem>
            ))}
            {items.length > 0 ? (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#fff', marginTop: '24px', fontWeight: '700'}}>
                  <span>Valor total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <PrimaryButton onClick={() => setStep('delivery')}>Continuar com a entrega</PrimaryButton>
              </>
            ) : (
              <p style={{color: '#fff', textAlign: 'center'}}>Carrinho vazio</p>
            )}
          </>
        )}

        {step === 'delivery' && (
          <FormContainer>
            <h3 style={{marginBottom: '8px'}}>Entrega</h3>
            <label>Quem irá receber</label><input type="text" />
            <label>Endereço</label><input type="text" />
            <label>Cidade</label><input type="text" />
            <div className="field-group">
              <div><label>CEP</label><input type="text" /></div>
              <div><label>Número</label><input type="text" /></div>
            </div>
            <label>Complemento (opcional)</label><input type="text" />
            <PrimaryButton onClick={() => setStep('payment')}>Continuar com pagamento</PrimaryButton>
            <SecondaryButton onClick={() => setStep('cart')}>Voltar para o carrinho</SecondaryButton>
          </FormContainer>
        )}

        {step === 'payment' && (
          <FormContainer>
            <h3 style={{marginBottom: '8px'}}>Pagamento - {formatPrice(totalPrice)}</h3>
            <label>Nome no cartão</label><input type="text" />
            <div className="field-group">
              <div><label>Número do cartão</label><input type="text" /></div>
              <div><label>CVV</label><input type="text" /></div>
            </div>
            <div className="field-group">
              <div><label>Vencimento (Mês)</label><input type="text" /></div>
              <div><label>Vencimento (Ano)</label><input type="text" /></div>
            </div>
            <PrimaryButton onClick={() => setStep('confirmation')}>Finalizar pagamento</PrimaryButton>
            <SecondaryButton onClick={() => setStep('delivery')}>Voltar para a entrega</SecondaryButton>
          </FormContainer>
        )}

        {step === 'confirmation' && (
          <div style={{color: '#fff'}}>
            <h3 style={{marginBottom: '16px'}}>Pedido realizado!</h3>
            <p style={{lineHeight: '22px', fontSize: '14px'}}>
              Seu pedido já está em processo de preparação. Aproveite sua refeição!
            </p>
            <PrimaryButton onClick={() => { dispatch(clear()); setStep('cart'); dispatch(toggleCart()); }}>Concluir</PrimaryButton>
          </div>
        )}
      </Sidebar>
    </CartContainer>
  )
}