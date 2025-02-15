import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardItem } from '@/app/api'

interface SearchState {
  results: CardItem[]
}

const initialState: SearchState = {
  results: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<CardItem[]>) => {
      state.results = action.payload
    },
    clearSearchResults: state => {
      state.results = []
    },
  },
})

export const { setSearchResults, clearSearchResults } = searchSlice.actions
export default searchSlice.reducer
