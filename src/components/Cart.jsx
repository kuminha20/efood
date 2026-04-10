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

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 24px 12px;
  }
`

const CartItem = styled.div`
  background-color: ${p => p.theme.colors.background}; /* Cor creme/bege */
  display: flex;
  padding: 8px;
  margin-bottom: 16px;
  position: relative; /* Necessário para a lixeira se posicionar em relação a ele */
  
  /* Imagem do prato (quadrada) */
  > img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  /* Container do Texto */
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Alinha o texto no topo */

    h3 { 
      font-size: 18px; 
      font-weight: 900; 
      color: ${p => p.theme.colors.primary};
      margin-bottom: 16px; /* Espaço exato entre título e preço da foto */
      line-height: 1;
    }
    
    p { 
      font-size: 14px; 
      color: ${p => p.theme.colors.primary};
      font-weight: 400;
    }
  }
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 8px;   /* Distância do fundo do card */
  right: 8px;    /* Distância da direita do card */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  &:hover {
    opacity: 0.7;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${p => p.theme.colors.background};

  label { font-size: 14px; font-weight: 700; margin-top: 8px; }
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
    @media (max-width: 480px) { flex-direction: column; gap: 0; }
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
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${p => p.theme.colors.background};
  margin-top: 8px;
`

// --- COMPONENTE ---
export default function Cart() {
  const { items, isOpen } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  
  // Estados de controle de fluxo
  const [step, setStep] = useState('cart')
  const [orderId, setOrderId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Estado do formulário
  const [form, setForm] = useState({
    receiver: '', address: '', city: '', zipCode: '', number: '', complement: '',
    cardName: '', cardNumber: '', cardCode: '', expiresMonth: '', expiresYear: ''
  })

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const totalPrice = items.reduce((acc, item) => acc + (item.preco || 0), 0)
  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  const handleFinish = () => {
    dispatch(clear())
    setStep('cart')
    dispatch(toggleCart())
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    const checkoutPayload = {
      products: items.map(item => ({ id: item.id, price: item.preco })),
      delivery: {
        receiver: form.receiver,
        address: {
          description: form.address,
          city: form.city,
          zipCode: form.zipCode,
          number: Number(form.number),
          complement: form.complement
        }
      },
      payment: {
        card: {
          name: form.cardName,
          number: form.cardNumber,
          code: Number(form.cardCode),
          expires: { month: Number(form.expiresMonth), year: Number(form.expiresYear) }
        },
        installments: 1
      }
    }

    try {
      const response = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload)
      })

      if (response.ok) {
        const data = await response.json()
        setOrderId(data.orderId)
        setStep('confirmation')
      } else {
        alert("Erro no checkout. Verifique os dados.")
      }
    } catch (error) {
      alert("Erro na requisição.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <CartContainer $isOpen={isOpen}>
      <div className="overlay" onClick={() => dispatch(toggleCart())} />
      <Sidebar>
        
        {step === 'cart' && (
  <>
    {/* Lista de itens */}
    {items.length > 0 ? (
      <>
        {items.map((item) => (
          <CartItem key={item.cartId}>
            <img src={item.foto} alt={item.nome} />
            <div>
              <h3>{item.nome}</h3>
              <p>{formatPrice(item.preco)}</p>
            </div>
            <DeleteButton onClick={() => dispatch(remove(item.cartId))}>
              <img src={lixeira} alt="Remover item" />
            </DeleteButton>
          </CartItem>
        ))}

        {/* VALOR TOTAL - Faltava este trecho */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#fff',
          marginTop: '24px',
          fontWeight: '700'
        }}>
          <span>Valor total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        {/* BOTÃO CONTINUAR - Faltava este trecho */}
        <PrimaryButton onClick={() => setStep('delivery')}>
          Continuar com a entrega
        </PrimaryButton>
      </>
    ) : (
      <p style={{ color: '#fff', textAlign: 'center' }}>O carrinho está vazio.</p>
    )}
  </>
)}

{/* --- ETAPA DE ENTREGA --- */}
{step === 'delivery' && (
  <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}>
    <FormContainer>
      <h3 style={{color: '#fff', marginBottom: '16px'}}>Entrega</h3>
      
      <label>Quem receberá</label>
      <input required value={form.receiver} onChange={e => updateField('receiver', e.target.value)} />
      
      <label>Endereço</label>
      <input required value={form.address} onChange={e => updateField('address', e.target.value)} />
      
      <label>Cidade</label>
      <input required value={form.city} onChange={e => updateField('city', e.target.value)} />
      
      <div className="field-group">
        <div>
          <label>CEP</label>
          <input required value={form.zipCode} onChange={e => updateField('zipCode', e.target.value)} />
        </div>
        <div>
          <label>Número</label>
          <input required type="number" value={form.number} onChange={e => updateField('number', e.target.value)} />
        </div>
      </div>
      
      <label>Complemento (opcional)</label>
      <input value={form.complement} onChange={e => updateField('complement', e.target.value)} />

      <PrimaryButton type="submit">Ir para pagamento</PrimaryButton>
      <SecondaryButton type="button" onClick={() => setStep('cart')}>Voltar para o carrinho</SecondaryButton>
    </FormContainer>
  </form>
)}

{/* --- ETAPA DE PAGAMENTO --- */}
{step === 'payment' && (
  <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
    <FormContainer>
      <h3 style={{color: '#fff', marginBottom: '16px'}}>Pagamento - {formatPrice(totalPrice)}</h3>
      
      <label>Nome no cartão</label>
      <input required value={form.cardName} onChange={e => updateField('cardName', e.target.value)} />
      
      <div className="field-group">
        <div style={{ flex: 3 }}>
          <label>Número do cartão</label>
          <input required value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <label>CVV</label>
          <input required type="number" value={form.cardCode} onChange={e => updateField('cardCode', e.target.value)} />
        </div>
      </div>

      <div className="field-group">
        <div>
          <label>Mês de vencimento</label>
          <input required type="number" min="1" max="12" value={form.expiresMonth} onChange={e => updateField('expiresMonth', e.target.value)} />
        </div>
        <div>
          <label>Ano de vencimento</label>
          <input required type="number" min="2026" value={form.expiresYear} onChange={e => updateField('expiresYear', e.target.value)} />
        </div>
      </div>

      <PrimaryButton type="submit" disabled={isLoading}>
        {isLoading ? 'Finalizando...' : 'Finalizar pagamento'}
      </PrimaryButton>
      <SecondaryButton type="button" onClick={() => setStep('delivery')}>Voltar para a edição do endereço</SecondaryButton>
    </FormContainer>
  </form>
)}

        {step === 'confirmation' && (
          <div style={{color: '#fff'}}>
            <h3 style={{marginBottom: '16px'}}>Pedido realizado - {orderId}</h3>
            <p style={{lineHeight: '22px'}}>Seu pedido foi recebido com sucesso! Número: {orderId}</p>
            <PrimaryButton onClick={handleFinish}>Concluir</PrimaryButton>
          </div>
        )}

      </Sidebar>
    </CartContainer>
  )
}