import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/user';
import tokenSlice from './slices/token';


const store = configureStore({
  reducer: {
    user: userSlice,
    token: tokenSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
