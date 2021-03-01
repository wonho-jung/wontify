import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    playlists: [],
    playing: false,
    item: null,
  },
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { set_user } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
