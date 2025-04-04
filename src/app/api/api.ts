import { ApiEndpoints } from '@/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AllFiltersResponse,
  Characteristic,
  CharacteristicDefaultValue,
  CharacteristicDefaultValuesResponse,
  CharacteristicsResponse,
  CreateCharacteristicRequest,
  NodesResponse,
  NodeType,
  Node,
  NodeTypesResponse,
  UpdateCharacteristicRequest,
  UpdateCharacteristicResponse,
  CreateCardResponse,
  CreateCardRequest,
  CardDetails,
  AllCardsResponse,
  CardItem,
} from './api.types'

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
    getAllCharacteristics: builder.query<
      CharacteristicsResponse,
      { page: number; size: number; nodeType?: string; characteristic?: string }
    >({
      query: ({ page, size, nodeType, characteristic }) =>
        GET_ALL_CHARACTERISTICS(page, size, nodeType, characteristic),
    }),

    createCharacteristic: builder.mutation<Characteristic, CreateCharacteristicRequest>({
      query: (body: CreateCharacteristicRequest) => ({
        url: CREATE_CHARACTERISTIC,
        method: 'POST',
        body,
      }),
    }),

    updateCharacteristic: builder.mutation<
      UpdateCharacteristicResponse,
      UpdateCharacteristicRequest
    >({
      query: (body: UpdateCharacteristicRequest) => ({
        url: `${UPDATE_CHARACTERISTIC}/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteCharacteristic: builder.mutation<{ id: number }, number>({
      query: id => ({
        url: DELETE_CHARACTERISTIC(id),
        method: 'DELETE',
      }),
    }),

    // В вашем API слое добавьте параметр nodeTypeId к запросу фильтров
    getAllFilters: builder.query<AllFiltersResponse, { nodeTypeId?: number }>({
      query: ({ nodeTypeId } = {}) => ({
        url: GET_ALL_FILTERS,
        params: nodeTypeId ? { nodeTypeId } : {},
      }),
    }),

    // Characteristic Default Values
    getAllCharDefaultValues: builder.query<
      CharacteristicDefaultValuesResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => GET_ALL_CHAR_DEFAULT_VALUES(page, size),
    }),
    getCharDefaultValueById: builder.query<CharacteristicDefaultValue, number>({
      query: id => GET_CHAR_DEFAULT_VALUE_BY_ID(id),
    }),
    createCharDefaultValue: builder.mutation<
      Omit<CharacteristicDefaultValue, 'title'>,
      { characteristicId: number; value: string }
    >({
      query: (body: { characteristicId: number; value: string }) => ({
        url: CREATE_CHAR_DEFAULT_VALUE,
        method: 'POST',
        body,
      }),
    }),
    updateCharDefaultValue: builder.mutation<
      Omit<CharacteristicDefaultValue, 'title'>,
      { id: number; value: string }
    >({
      query: (body: { id: number; value: string }) => ({
        url: UPDATE_CHAR_DEFAULT_VALUE,
        method: 'PUT',
        body,
      }),
    }),
    deleteCharDefaultValue: builder.mutation<{ id: number }, number>({
      query: id => ({
        url: DELETE_CHAR_DEFAULT_VALUE(id),
        method: 'DELETE',
      }),
    }),

    // Node Types
    getAllNodeTypes: builder.query<NodeTypesResponse, { page: number; size: number }>({
      query: ({ page, size }) => GET_ALL_NODE_TYPES(page, size),
    }),
    createNodeType: builder.mutation<NodeType, { type: string; description: string | null }>({
      query: (body: { type: string; description: string | null }) => ({
        url: CREATE_NODE_TYPE,
        method: 'POST',
        body,
      }),
    }),
    updateNodeType: builder.mutation<NodeType, NodeType>({
      query: (body: NodeType) => ({
        url: UPDATE_NODE_TYPE,
        method: 'PUT',
        body,
      }),
    }),
    deleteNodeType: builder.mutation<{ id: number }, number>({
      query: id => ({
        url: DELETE_NODE_TYPE(id),
        method: 'DELETE',
      }),
    }),

    // Nodes
    getAllNodes: builder.query<NodesResponse, { page: number; size: number }>({
      query: ({ page, size }) => GET_ALL_NODES(page, size),
    }),
    createNode: builder.mutation<
      Node,
      { title: string; nodeTypeId: number; description: string | null }
    >({
      query: (body: { title: string; nodeTypeId: number; description: string | null }) => ({
        url: CREATE_NODE,
        method: 'POST',
        body,
      }),
    }),
    //TODO: check response type
    updateNode: builder.mutation<
      unknown,
      Pick<Node, 'id' | 'title' | 'nodeTypeId' | 'description'>
    >({
      query: body => ({
        url: UPDATE_NODE,
        method: 'PUT',
        body,
      }),
    }),
    deleteNode: builder.mutation<{ id: number }, number>({
      query: id => ({
        url: DELETE_NODE(id),
        method: 'DELETE',
      }),
    }),

    // Cards
    createCard: builder.mutation<CreateCardResponse, CreateCardRequest>({
      query: (body: CreateCardRequest) => ({
        url: CREATE_CARD,
        method: 'POST',
        body,
      }),
    }),
    getCardById: builder.query<CardDetails, number>({
      query: id => GET_CARD_BY_ID(id),
    }),

    getAllCards: builder.query<
      AllCardsResponse,
      {
        pageNumber?: number
        pageSize?: number
        nodeTypeId?: number
        filters?: Record<string, string>
      }
    >({
      query: (args = {}) => GET_ALL_CARDS(args),
    }),

    searchCards: builder.mutation<CardItem[], { text: string; limit: number }>({
      query: body => ({
        url: SEARCH_CARDS,
        method: 'POST',
        body,
      }),
    }),

    //TODO: check need it or not
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
  useLazyGetAllCardsQuery,
  useSearchCardsMutation,
  useDeleteFilesByNodeIdMutation,
  useDeleteFileByUuidMutation,
  useUploadFilesMutation,
} = api
