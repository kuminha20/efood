import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false
  },
  reducers: {
    add: (state, action) => {
      // Criamos um ID único para cada entrada no carrinho
      const newItem = { ...action.payload, cartId: Math.random() }
      state.items.push(newItem)
      state.isOpen = true
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.cartId !== action.payload)
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    clear: (state) => {
      state.items = []
    }
  }
})

export const { add, remove, toggleCart, clear } = cartSlice.actions
export default cartSlice.reducer