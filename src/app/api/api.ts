import { ApiEndpoints } from '@/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CharacteristicsResponse } from './api.types'

const {
  GET_ALL_CHARACTERISTICS,
  CREATE_CHARACTERISTIC,
  UPDATE_CHARACTERISTIC,
  DELETE_CHARACTERISTIC,
  GET_ALL_FILTERS,
  GET_ALL_CHAR_DEFAULT_VALUES,
  GET_CHAR_DEFAULT_VALUE_BY_ID,
  CREATE_CHAR_DEFAULT_VALUE,
  UPDATE_CHAR_DEFAULT_VALUE,
  DELETE_CHAR_DEFAULT_VALUE,
  GET_ALL_NODE_TYPES,
  CREATE_NODE_TYPE,
  UPDATE_NODE_TYPE,
  DELETE_NODE_TYPE,
  GET_ALL_NODES,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  CREATE_CARD,
  GET_CARD_BY_ID,
  GET_ALL_CARDS,
  SEARCH_CARDS,
  DELETE_FILES_BY_NODE_ID,
  DELETE_FILE_BY_UUID,
  UPLOAD_FILES,
} = ApiEndpoints

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ApiEndpoints.BASE_URL }),
  endpoints: builder => ({
    // Characteristics
    getAllCharacteristics: builder.query<CharacteristicsResponse, { page: number; size: number }>({
      query: ({ page, size }) => GET_ALL_CHARACTERISTICS(page, size),
    }),
    createCharacteristic: builder.mutation({
      query: body => ({
        url: CREATE_CHARACTERISTIC,
        method: 'POST',
        body,
      }),
    }),
    updateCharacteristic: builder.mutation({
      query: body => ({
        url: UPDATE_CHARACTERISTIC,
        method: 'PUT',
        body,
      }),
    }),
    deleteCharacteristic: builder.mutation({
      query: id => ({
        url: DELETE_CHARACTERISTIC(id),
        method: 'DELETE',
      }),
    }),
    getAllFilters: builder.query({
      query: () => GET_ALL_FILTERS,
    }),

    // Characteristic Default Values
    getAllCharDefaultValues: builder.query({
      query: () => GET_ALL_CHAR_DEFAULT_VALUES,
    }),
    getCharDefaultValueById: builder.query({
      query: id => GET_CHAR_DEFAULT_VALUE_BY_ID(id),
    }),
    createCharDefaultValue: builder.mutation({
      query: body => ({
        url: CREATE_CHAR_DEFAULT_VALUE,
        method: 'POST',
        body,
      }),
    }),
    updateCharDefaultValue: builder.mutation({
      query: body => ({
        url: UPDATE_CHAR_DEFAULT_VALUE,
        method: 'PUT',
        body,
      }),
    }),
    deleteCharDefaultValue: builder.mutation({
      query: id => ({
        url: DELETE_CHAR_DEFAULT_VALUE(id),
        method: 'DELETE',
      }),
    }),

    // Node Types
    getAllNodeTypes: builder.query({
      query: ({ page, size }) => GET_ALL_NODE_TYPES(page, size),
    }),
    createNodeType: builder.mutation({
      query: body => ({
        url: CREATE_NODE_TYPE,
        method: 'POST',
        body,
      }),
    }),
    updateNodeType: builder.mutation({
      query: body => ({
        url: UPDATE_NODE_TYPE,
        method: 'PUT',
        body,
      }),
    }),
    deleteNodeType: builder.mutation({
      query: id => ({
        url: DELETE_NODE_TYPE(id),
        method: 'DELETE',
      }),
    }),

    // Nodes
    getAllNodes: builder.query({
      query: ({ page, size }) => GET_ALL_NODES(page, size),
    }),
    createNode: builder.mutation({
      query: body => ({
        url: CREATE_NODE,
        method: 'POST',
        body,
      }),
    }),
    updateNode: builder.mutation({
      query: body => ({
        url: UPDATE_NODE,
        method: 'PUT',
        body,
      }),
    }),
    deleteNode: builder.mutation({
      query: id => ({
        url: DELETE_NODE(id),
        method: 'DELETE',
      }),
    }),

    // Cards
    createCard: builder.mutation({
      query: body => ({
        url: CREATE_CARD,
        method: 'POST',
        body,
      }),
    }),
    getCardById: builder.query({
      query: id => GET_CARD_BY_ID(id),
    }),
    getAllCards: builder.query({
      query: () => GET_ALL_CARDS,
    }),
    searchCards: builder.mutation({
      query: body => ({
        url: SEARCH_CARDS,
        method: 'POST',
        body,
      }),
    }),

    // Files
    deleteFilesByNodeId: builder.mutation({
      query: id => ({
        url: DELETE_FILES_BY_NODE_ID(id),
        method: 'DELETE',
      }),
    }),
    deleteFileByUuid: builder.mutation({
      query: ({ id, img }) => ({
        url: DELETE_FILE_BY_UUID(id, img),
        method: 'DELETE',
      }),
    }),
    uploadFiles: builder.mutation({
      query: ({ id, formData }) => ({
        url: UPLOAD_FILES(id),
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const {
  useGetAllCharacteristicsQuery,
  useCreateCharacteristicMutation,
  useUpdateCharacteristicMutation,
  useDeleteCharacteristicMutation,
  useGetAllFiltersQuery,
  useGetAllCharDefaultValuesQuery,
  useGetCharDefaultValueByIdQuery,
  useCreateCharDefaultValueMutation,
  useUpdateCharDefaultValueMutation,
  useDeleteCharDefaultValueMutation,
  useGetAllNodeTypesQuery,
  useCreateNodeTypeMutation,
  useUpdateNodeTypeMutation,
  useDeleteNodeTypeMutation,
  useGetAllNodesQuery,
  useCreateNodeMutation,
  useUpdateNodeMutation,
  useDeleteNodeMutation,
  useCreateCardMutation,
  useGetCardByIdQuery,
  useGetAllCardsQuery,
  useSearchCardsMutation,
  useDeleteFilesByNodeIdMutation,
  useDeleteFileByUuidMutation,
  useUploadFilesMutation,
} = api
