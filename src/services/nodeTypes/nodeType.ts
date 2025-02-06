import { baseApi } from '@/services/baseApi'
import { ResponseGetAllNodeTypes, nodeType } from '@/services/nodeTypes/nodeTypes.type'

export const nodeTypes = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllNodeTypes: builder.query<ResponseGetAllNodeTypes, { page?: number; size?: number }>({
      query: ({ page = 1, size = 100 }) => ({ url: `node-types?page=${page}&size=${size}` }),
      providesTags: ['nodeType'],
    }),
    createNodeType: builder.mutation<nodeType, { type: string; description?: null | string }>({
      query: body => ({ body, method: 'POST', url: 'node-types' }),
      invalidatesTags: ['nodeType'],
    }),
    removeNodeType: builder.mutation<{ id: number }, number>({
      query: id => ({ method: 'DELETE', url: `node-types/${id}` }),
      invalidatesTags: ['nodeType'],
    }),
    updateNodeType: builder.mutation<
      nodeType,
      {
        id: number
        type: string
        description?: null | string
      }
    >({
      query: body => ({ body, method: 'PUT', url: 'node-types' }),
      invalidatesTags: ['nodeType'],
    }),
  }),
})

export const {
  useGetAllNodeTypesQuery,
  useCreateNodeTypeMutation,
  useRemoveNodeTypeMutation,
  useUpdateNodeTypeMutation,
} = nodeTypes
