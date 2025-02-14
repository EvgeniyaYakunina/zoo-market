import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AllCardsResponse, CardItem } from '@/app/api'

interface CardsState {
  cards: CardItem[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPageCount: number
}

const initialState: CardsState = {
  cards: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  totalPageCount: 1,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<AllCardsResponse>) => {
      state.cards = action.payload.items
      state.totalCount = action.payload.rowTotalCount
      state.pageNumber = action.payload.pageNumber
      state.pageSize = action.payload.pageSize
      state.totalPageCount = action.payload.totalPageCount
    },
    clearCards: state => {
      state.cards = []
      state.totalCount = 0
      state.pageNumber = 1
      state.pageSize = 10
      state.totalPageCount = 1
    },
  },
})

export const { setCards, clearCards } = cardsSlice.actions
export default cardsSlice.reducer
