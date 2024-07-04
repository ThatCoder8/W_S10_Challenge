// import { configureStore, createSlice } from '@reduxjs/toolkit'
// import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const usersApi = createApi({
//   reducerPath: 'usersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:9009/api/'}),
//   endpoint: (builder) => ({
//     getUsers: builder.query({
//       query: () => 'users',
//     }),
//   }),
// });

// export const { useGetUsersQuery } = usersApi;

// const filterSlice = createSlice({
//   name: 'filer',
//   initialState: 'All',
//   reducers: {
//     setFilter: (state,action) => action.payload,
//   },
// });

// export const {setFilter} = filterSlice.actions;

// const exampleReducer = (state = { count: 0 }) => {
//   return state
// }

// export const resetStore = () => configureStore({
//   reducer: {
//     example: exampleReducer,
//     // add your reducer(s) here
//     [usersApi.reducerPath]: usersApi.reducer,
//     filter: filterSlice.reducer
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
//     // if using RTK Query for your networking: add your middleware here
//     // if using Redux Thunk for your networking: you can ignore this
// });

// export const store = resetStore();

// // store.js
// import { configureStore, createSlice } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const pizzaApi = createApi({
//   reducerPath: 'pizzaApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/' }),
//   endpoints: (builder) => ({
//     getPizzaHistory: builder.query({
//       query: () => 'pizza/history',
//     }),
//     addPizzaOrder: builder.mutation({
//       query: (newOrder) => ({
//         url: 'pizza/order',
//         method: 'POST',
//         body: newOrder,
//       }),
//     }),
//   }),
// });

// export const { useGetPizzaHistoryQuery, useAddPizzaOrderMutation } = pizzaApi;

// const filterSlice = createSlice({
//   name: 'filter',
//   initialState: 'All',
//   reducers: {
//     setFilter: (state, action) => action.payload,
//   },
// });

// export const { setFilter } = filterSlice.actions;

// export const resetStore = () => configureStore({
//   reducer: {
//     [pizzaApi.reducerPath]: pizzaApi.reducer,
//     filter: filterSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pizzaApi.middleware),
// });

// export const store = resetStore();

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/' }),
  tagTypes: ['PizzaOrders'], // Add tag type here
  endpoints: (builder) => ({
    getPizzaHistory: builder.query({
      query: () => 'pizza/history',
      providesTags: ['PizzaOrders'], // Provide tag here
    }),
    addPizzaOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'pizza/order',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['PizzaOrders'], // Invalidate tag here
    }),
  }),
});

export const { useGetPizzaHistoryQuery, useAddPizzaOrderMutation } = pizzaApi;

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'All',
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;

export const resetStore = () => configureStore({
  reducer: {
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    filter: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pizzaApi.middleware),
});

export const store = resetStore();
