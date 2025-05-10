import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// currency type
export type Currency = 'RUB' | 'BYN'

/**
 * Async Thunk to determine the country by IP and set the currency.
 * It fetches the user's country code based on their IP address
 * and returns the corresponding currency.
 *
 * @returns {Promise<Currency>} The currency based on the country code.
 */
export const fetchCurrency = createAsyncThunk<Currency>('currency/fetchCurrency', async () => {
  try {
    const res = await fetch('https://ipapi.co/json/')
    const data: { country_code: string } = await res.json()
    if (data.country_code === 'RU') return 'RUB'
    if (data.country_code === 'BY') return 'BYN'
    return 'BYN'
  } catch {
    return 'BYN'
  }
})

interface CurrencyState {
  value: Currency // The current currency value
  status: 'idle' | 'loading' | 'failed' // The status of the currency fetch operation
}

const initialState: CurrencyState = {
  value: 'BYN',
  status: 'idle',
}

/**
 * Slice for managing currency state.
 * It includes reducers for setting the currency and handling async actions.
 */
export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    /**
     * Sets the currency value in the state.
     *
     * @param {Currency} action.payload - The currency to set.
     */
    setCurrency(state, action: PayloadAction<Currency>) {
      state.value = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.value = action.payload
        state.status = 'idle'
      })
      .addCase(fetchCurrency.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { setCurrency } = currencySlice.actions
export default currencySlice.reducer
