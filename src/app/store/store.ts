import { api } from '@/app/api'
import { configureStore } from '@reduxjs/toolkit'
import cardsSlice from '@/app/store/slices/cardsSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cards: cardsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
