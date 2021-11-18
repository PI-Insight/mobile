import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITokenSliceState {
  token: string;
}

const initialState: ITokenSliceState = {
  token: '',
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  },
})

export default tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;