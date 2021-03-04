import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export interface userProps {
  isLoading: boolean;
  isSignIn: boolean;
  data: {
    email: string;
    id: string;
    token: string;
  } | null;
}

export interface userSignInProps {
  email: string;
  senha: string;
}

const initialState: userProps = JSON.parse(
  localStorage.getItem('nave-user')!
) || { isLoading: false, isSignIn: false };

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (data: userSignInProps, { rejectWithValue }) => {
    try {
      const response = await api.post('users/login', {
        email: data.email,
        password: data.senha,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state.data = null;
      state.isSignIn = false;
      localStorage.removeItem('nave-user');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, state => {
        state.isSignIn = false;
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isSignIn = true;
        state.isLoading = false;
        localStorage.setItem('nave-user', JSON.stringify(state));
      })
      .addCase(signInUser.rejected, state => {
        state.isSignIn = false;
        state.isLoading = false;
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
