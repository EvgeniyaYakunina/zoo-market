import {
  characteristic,
  characteristics,
} from '@/services/characteristics/characteristicsServise.types'
import { baseApi } from '@/services/baseApi'

export const characteristicsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCharacteristics: builder.query<characteristics, void>({
      query: () => ({ url: 'characteristics?page=1&size=15' }),
      providesTags: ['characteristics'],
    }),
    createCharacteristic: builder.mutation<
      characteristic,
      { title: string; description?: null | string }
    >({
      query: body => ({ body, method: 'POST', url: 'characteristics' }),
      invalidatesTags: ['characteristics'],
    }),
    removeCharacteristic: builder.mutation<{ id: number }, number>({
      query: id => ({ method: 'DELETE', url: `characteristics/${id}` }),
      invalidatesTags: ['characteristics'],
    }),
    updateCharacteristic: builder.mutation<
      characteristic,
      {
        id: number
        title: string
        description?: string
        isVisible?: boolean
      }
    >({
      query: body => ({ body, method: 'PUT', url: 'characteristics' }),
      invalidatesTags: ['characteristics'],
    }),
  }),
})

export const {
  useGetCharacteristicsQuery,
  useCreateCharacteristicMutation,
  useRemoveCharacteristicMutation,
  useUpdateCharacteristicMutation,
} = characteristicsService
