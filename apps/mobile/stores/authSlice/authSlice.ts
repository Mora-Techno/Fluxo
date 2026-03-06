import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setRole(state, action: PayloadAction<string | null>) {
      state.role = action.payload;
    },
    logout(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setToken, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
