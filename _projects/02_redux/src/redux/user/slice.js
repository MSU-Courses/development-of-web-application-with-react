import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "John Doe",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    resetName(state) {
      state.name = initialState.name;
    },
    capitilizeName(state) {
      state.name = state.name.toUpperCase();
    },
  },
});

export const { setName, resetName, capitilizeName } = userSlice.actions;
export default userSlice.reducer;
