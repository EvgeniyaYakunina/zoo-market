import { baseApi } from '@/services/baseApi'
import { RequestCreateCard, ResponseCreateCard } from '@/services/cards/cards.types'

export const cards = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<ResponseCreateCard, RequestCreateCard>({
      query: body => ({ body, method: 'POST', url: 'cards' }),
    }),
  }),
})

export const { useCreateCardMutation } = cards
