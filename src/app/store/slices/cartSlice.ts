import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '@/hooks'

interface CartState {
  items: CartItem[]
  totalQuantity: number
  isLoaded: boolean
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  isLoaded: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartFromStorage: state => {
      try {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
          const parsedCart: CartItem[] = JSON.parse(storedCart)
          state.items = parsedCart
          state.totalQuantity = parsedCart.reduce((sum, item) => sum + (item.quantity || 1), 0)
        }
        state.isLoaded = true
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        state.items = []
        state.totalQuantity = 0
        state.isLoaded = true
      }
    },

    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)

      if (!existingItem) {
        state.items.push(newItem)
        state.totalQuantity += newItem.quantity || 1

        // Sync with localStorage
        localStorage.setItem('cart', JSON.stringify(state.items))
        window.dispatchEvent(new Event('cartUpdated'))
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload
      const itemIndex = state.items.findIndex(item => item.id === itemId)

      if (itemIndex >= 0) {
        const removedItem = state.items[itemIndex]
        state.totalQuantity -= removedItem.quantity || 1
        state.items.splice(itemIndex, 1)

        // Sync with localStorage
        localStorage.setItem('cart', JSON.stringify(state.items))
        window.dispatchEvent(new Event('cartUpdated'))
      }
    },

    updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        const oldQuantity = item.quantity || 1
        item.quantity = quantity
        state.totalQuantity = state.totalQuantity - oldQuantity + quantity

        // Sync with localStorage
        localStorage.setItem('cart', JSON.stringify(state.items))
        window.dispatchEvent(new Event('cartUpdated'))
      }
    },

    updateItemSizeQuantities: (
      state,
      action: PayloadAction<{ id: number; sizeQuantities: { [key: string]: number } }>
    ) => {
      const { id, sizeQuantities } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        const oldQuantity = item.quantity || 1
        const newQuantity = Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0)

        item.sizeQuantities = sizeQuantities
        item.quantity = newQuantity
        state.totalQuantity = state.totalQuantity - oldQuantity + newQuantity

        // Sync with localStorage
        localStorage.setItem('cart', JSON.stringify(state.items))
        window.dispatchEvent(new Event('cartUpdated'))
      }
    },

    clearCart: state => {
      state.items = []
      state.totalQuantity = 0

      // Sync with localStorage
      localStorage.setItem('cart', JSON.stringify([]))
      window.dispatchEvent(new Event('cartUpdated'))
    },
  },
})

export const {
  loadCartFromStorage,
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemSizeQuantities,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
