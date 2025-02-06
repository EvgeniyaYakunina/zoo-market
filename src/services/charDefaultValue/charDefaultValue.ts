import { baseApi } from '@/services/baseApi'
import {
  charDefaultValueId,
  ResponseAllCharDefaultValue,
  ResponseCreateCharDefaultValue,
  ResponseUpdateCharDefaultValue,
} from '@/services/charDefaultValue/charDefaulValue.types'

export const charDefaultValue = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllCharDefaultValue: builder.query<
      ResponseAllCharDefaultValue,
      { page?: number; size?: number }
    >({
      query: ({ page = 1, size = 100 }) => ({ url: `selectors?page=${page}&size=${size}` }),
    }),
    getCharDefaultValueId: builder.query<charDefaultValueId[], number>({
      query: id => ({ url: `selectors/${id}` }),
      providesTags: ['charDefaultValue'],
    }),
    createCharDefaultValue: builder.mutation<
      ResponseCreateCharDefaultValue,
      {
        characteristicId: number
        value: string
        title: string
      }
    >({
      query: body => ({ body, method: 'POST', url: '/selectors' }),
      invalidatesTags: ['charDefaultValue'],
    }),
    updateCharDefaultValue: builder.mutation<
      ResponseUpdateCharDefaultValue,
      {
        id: number
        value: string
      }
    >({
      query: body => ({ body, method: 'PUT', url: '/selectors' }),
      invalidatesTags: ['charDefaultValue'],
    }),
    removeCharDefaultValue: builder.mutation<{ id: number }, number>({
      query: id => ({ method: 'DELETE', url: `/selectors/${id}` }),
      invalidatesTags: ['charDefaultValue'],
    }),
  }),
})

export const {
  useGetCharDefaultValueIdQuery,
  useCreateCharDefaultValueMutation,
  useGetAllCharDefaultValueQuery,
  useRemoveCharDefaultValueMutation,
  useUpdateCharDefaultValueMutation,
} = charDefaultValue
