import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['characteristics', 'charDefaultValue', 'nodeType'],
})
