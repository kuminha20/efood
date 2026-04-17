import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { remove, toggleCart, clear } from '../store/cartSlice'
import lixeira from '../assets/lixeira.png'

// --- ESTILOS ---
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
`

const CartItem = styled.div`
  background-color: ${p => p.theme.colors.background};
  display: flex;
  padding: 8px;
  margin-bottom: 16px;
  position: relative;
  
  > img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  div {
    display: flex;
    flex-direction: column;
    h3 { font-size: 18px; font-weight: 900; color: ${p => p.theme.colors.primary}; margin-bottom: 16px; }
    p { font-size: 14px; color: ${p => p.theme.colors.primary}; }
  }
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  img { width: 16px; height: 16px; }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${p => p.theme.colors.background};
  h3 { margin-bottom: 16px; font-size: 16px; }
  label { font-size: 14px; font-weight: 700; margin-top: 8px; margin-bottom: 8px; }
  input {
    background-color: ${p => p.theme.colors.background};
    border: 1px solid ${p => p.theme.colors.background};
    padding: 8px;
    height: 32px;
    font-weight: 700;
    color: #4b4b4b;
  }
  .field-group {
    display: flex;
    gap: 34px;
    div { display: flex; flex-direction: column; width: 100%; }
  }
`

const PrimaryButton = styled.button`
  background-color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: none;
  padding: 8px;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  margin-top: 24px;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
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
  const [orderId, setOrderId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    receiver: '', address: '', city: '', zipCode: '', number: '', complement: '',
    cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: ''
  })

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const totalPrice = items.reduce((acc, item) => acc + (item.preco || 0), 0)
  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  const handleCheckout = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const payload = {
      products: items.map(item => ({ id: item.id, price: item.preco })),
      delivery: {
        receiver: form.receiver,
        address: { description: form.address, city: form.city, zipCode: form.zipCode, number: Number(form.number), complement: form.complement }
      },
      payment: {
        card: { name: form.cardName, number: form.cardNumber, code: Number(form.cardCode), expires: { month: Number(form.expiresMonth), year: Number(form.expiresYear) } },
        installments: 1
      }
    }

    try {
      const res = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      setOrderId(data.orderId)
      setStep('confirmation')
      dispatch(clear())
    } catch {
      alert("Erro ao processar pedido.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <CartContainer $isOpen={isOpen}>
      <div className="overlay" onClick={() => dispatch(toggleCart())} />
      <Sidebar>
        
        {/* TELA 1: CARRINHO */}
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
                <DeleteButton onClick={() => dispatch(remove(item.cartId))}><img src={lixeira} alt="Remover" /></DeleteButton>
              </CartItem>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-between', color: '#fff', marginTop: '24px', fontWeight: '700'}}>
              <span>Valor total</span><span>{formatPrice(totalPrice)}</span>
            </div>
            <PrimaryButton onClick={() => setStep('delivery')}>Continuar com a entrega</PrimaryButton>
          </>
        )}

        {/* TELA 2: ENTREGA */}
        {step === 'delivery' && (
          <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}>
            <FormContainer>
              <h3>Entrega</h3>
              <label>Quem receberá</label>
              <input required value={form.receiver} onChange={e => updateField('receiver', e.target.value)} />
              <label>Endereço</label>
              <input required value={form.address} onChange={e => updateField('address', e.target.value)} />
              <label>Cidade</label>
              <input required value={form.city} onChange={e => updateField('city', e.target.value)} />
              <div className="field-group">
                <div><label>CEP</label><input required value={form.zipCode} onChange={e => updateField('zipCode', e.target.value)} /></div>
                <div><label>Número</label><input required type="number" value={form.number} onChange={e => updateField('number', e.target.value)} /></div>
              </div>
              <label>Complemento (opcional)</label>
              <input value={form.complement} onChange={e => updateField('complement', e.target.value)} />
              <PrimaryButton type="submit">Ir para pagamento</PrimaryButton>
              <SecondaryButton type="button" onClick={() => setStep('cart')}>Voltar para o carrinho</SecondaryButton>
            </FormContainer>
          </form>
        )}

        {/* TELA 3: PAGAMENTO */}
        {step === 'payment' && (
          <form onSubmit={handleCheckout}>
            <FormContainer>
              <h3>Pagamento - Valor a pagar {formatPrice(totalPrice)}</h3>
              <label>Nome no cartão</label>
              <input required value={form.cardName} onChange={e => updateField('cardName', e.target.value)} />
              <div className="field-group">
                <div style={{flex: 3}}><label>Número do cartão</label><input required value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} /></div>
                <div><label>CVV</label><input required type="number" value={form.cardCode} onChange={e => updateField('cardCode', e.target.value)} /></div>
              </div>
              <div className="field-group">
                <div><label>Mês de vencimento</label><input required type="number" value={form.expiresMonth} onChange={e => updateField('expiresMonth', e.target.value)} /></div>
                <div><label>Ano de vencimento</label><input required type="number" value={form.expiresYear} onChange={e => updateField('expiresYear', e.target.value)} /></div>
              </div>
              <PrimaryButton type="submit" disabled={isLoading}>{isLoading ? 'Finalizando...' : 'Finalizar pagamento'}</PrimaryButton>
              <SecondaryButton type="button" onClick={() => setStep('delivery')}>Voltar para a entrega</SecondaryButton>
            </FormContainer>
          </form>
        )}

        {/* TELA 4: CONFIRMAÇÃO */}
        {step === 'confirmation' && (
          <div style={{color: '#fff'}}>
            <h3 style={{marginBottom: '16px'}}>Pedido realizado - {orderId}</h3>
            <p style={{lineHeight: '22px', fontSize: '14px'}}>
              Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
              <br /><br />
              Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras. 
              <br /><br />
              Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar.
              <br /><br />
              Esperamos que desfrute de uma ótima experiência gastronômica. Bom apetite!
            </p>
            <PrimaryButton onClick={() => { setStep('cart'); dispatch(toggleCart()); }}>Concluir</PrimaryButton>
          </div>
        )}
      </Sidebar>
    </CartContainer>
  )
}