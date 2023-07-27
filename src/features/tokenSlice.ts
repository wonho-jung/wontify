import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface Token {
  token: string | null;
}

const initialTokenSlice: Token = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialTokenSlice,

  reducers: {
    set_token: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { set_token } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.token;

export default tokenSlice.reducer;
