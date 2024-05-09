import {combineReducers, configureStore} from "@reduxjs/toolkit"
import cartReducer from "./src/features/cart/cartSlice"
import authReducer from "./src/features/auth/authSlice"
import {persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist"
import storage from "redux-persist/lib/storage"


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["products", "productsSum"]
}


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch