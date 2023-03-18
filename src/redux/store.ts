import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../pokemonApi";

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
