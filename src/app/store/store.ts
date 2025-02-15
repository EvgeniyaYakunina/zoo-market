import { api } from '@/app/api'
import { configureStore } from '@reduxjs/toolkit'
import cardsSlice from '@/app/store/slices/cardsSlice'
import searchSlice from '@/app/store/slices/searchSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cards: cardsSlice,
    search: searchSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
