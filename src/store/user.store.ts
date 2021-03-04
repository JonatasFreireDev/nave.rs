import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export interface userProps {
  email: string;
  id: string;
  token: string;
  status: string;
}

export interface userSignInProps {
  email: string;
  senha: string;
}

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (data: userSignInProps) => {
    const response = await api.post('users/login', {
      email: data.email,
      password: data.senha,
    });

    return response.data;
  }
);

const initialState: userProps = {} as userProps;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state, action) {
      state = {} as userProps;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state = action.payload;
        state.status = 'ok';
        console.log(state);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'fail';
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
