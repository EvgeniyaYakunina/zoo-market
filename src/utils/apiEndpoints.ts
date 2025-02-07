export const ApiEndpoints = {
  BASE_URL: 'https://alekseyfgl-shop-3ca5.twc1.net/api',

  // Characteristics
  GET_ALL_CHARACTERISTICS: (page: number, size: number) =>
    `characteristics?page=${page}&size=${size}`,
  CREATE_CHARACTERISTIC: 'characteristics',
  UPDATE_CHARACTERISTIC: 'characteristics',
  DELETE_CHARACTERISTIC: (id: number) => `characteristics/${id}`,
  GET_ALL_FILTERS: 'characteristics/filters',

  // Characteristic Default Values
  //TODO: check this endpoint
  GET_ALL_CHAR_DEFAULT_VALUES: 'selectors',
  GET_CHAR_DEFAULT_VALUE_BY_ID: (id: number) => `selectors/${id}`,
  CREATE_CHAR_DEFAULT_VALUE: 'selectors',
  UPDATE_CHAR_DEFAULT_VALUE: 'selectors',
  DELETE_CHAR_DEFAULT_VALUE: (id: number) => `selectors/${id}`,

  // Node Types
  GET_ALL_NODE_TYPES: (page: number, size: number) => `node-types?page=${page}&size=${size}`,
  CREATE_NODE_TYPE: 'node-types',
  UPDATE_NODE_TYPE: 'node-types',
  DELETE_NODE_TYPE: (id: number) => `node-types/${id}`,

  // Nodes
  GET_ALL_NODES: (page: number, size: number) => `nodes?page=${page}&size=${size}`,
  CREATE_NODE: 'nodes',
  UPDATE_NODE: 'nodes',
  DELETE_NODE: (id: number) => `nodes/${id}`,

  // Cards
  CREATE_CARD: 'cards',
  GET_CARD_BY_ID: (id: number) => `cards/${id}`,
  GET_ALL_CARDS: 'cards',
  SEARCH_CARDS: 'cards/search',

  // Files
  DELETE_FILES_BY_NODE_ID: (id: number) => `files/upload/${id}`,
  //TODO:check this endpoint
  DELETE_FILE_BY_UUID: (id: number, img: string) => `files/upload/${id}/${img}`,
  UPLOAD_FILES: (id: number) => `files/upload/${id}`,
}
