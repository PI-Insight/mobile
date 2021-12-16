import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUSerSliceState {
  isLoggedIn: boolean;
  id: number;
  username: string;
  email: string;
}

const initialState: IUSerSliceState = {
  isLoggedIn: false,
  id: -1,
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<IUSerSliceState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
