import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUSerSliceState {
  isLoggedIn: boolean;
  id: number;
  username: string;
  email: string;
}

const initialState: IUSerSliceState = {
  isLoggedIn: false,
  id: -1,
  username: '',
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload
    },
    setUser(state, action: PayloadAction<Partial<IUSerSliceState>>) {
      return { ...state, ...action.payload}
    }
  },
})

export default userSlice.reducer;
export const { setLoggedIn, setUser } = userSlice.actions;