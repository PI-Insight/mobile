import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITokenSliceState {
  token: string;
  expiration: string;
  id: number;
}

const initialState: ITokenSliceState = {
  id: -1,
  expiration: '',
  token: '',
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Partial<ITokenSliceState>>) {
      return {...state, ...action.payload}
    }
  },
})

export default tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;