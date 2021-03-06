/* eslint-disable camelcase */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';

import { INaver } from '../Interface/INavers';

interface INaverStore {
  navers: INaver[];
  isLoading: boolean;
}

interface getNaversProps {
  token?: string;
}

interface postNaverApi {
  dataForm: SignUpFormData;
  token?: string;
}

interface putNaverApi {
  id: string;
  dataForm: SignUpFormData;
  token?: string;
}

interface deleteNaverApi {
  idNaver: string;
  token?: string;
}

interface SignUpFormData {
  name?: string;
  birthdate?: string;
  project?: string;
  job_role?: string;
  admission_date?: string;
  url?: string;
}

interface responseNaver {
  id: string;
  user_id: string;
  name: string;
  birthdate: string;
  project: string;
  job_role: string;
  admission_date: string;
  url: string;
}

const initialState: INaverStore = {
  navers: [],
  isLoading: false,
};

export const getNaversAPI = createAsyncThunk(
  'naver/loadFromApi',
  async ({ token }: getNaversProps) => {
    const { data } = await api.get<INaver[]>(`/navers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const postNaverAPI = createAsyncThunk(
  'naver/createNaver',
  async ({ dataForm, token }: postNaverApi) => {
    const { data } = await api.post<responseNaver>(`/navers`, dataForm, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const putNaverAPI = createAsyncThunk(
  'naver/updateNaver',
  async ({ id, dataForm, token }: putNaverApi) => {
    console.log(dataForm);
    const { data } = await api.put(`/navers/${id}`, dataForm, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    return data;
  }
);

export const deleteNaverAPI = createAsyncThunk(
  'naver/deleteNaver',
  async ({ idNaver, token }: deleteNaverApi) => {
    const { data } = await api.delete(`/navers/${idNaver}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

const naversSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get
      .addCase(getNaversAPI.pending, state => {
        state.isLoading = true;
      })
      .addCase(getNaversAPI.fulfilled, (state, action) => {
        state.navers = action.payload;
        state.isLoading = false;
      })
      .addCase(getNaversAPI.rejected, state => {
        state.isLoading = false;
      })
      //Post
      .addCase(postNaverAPI.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        postNaverAPI.fulfilled,
        (state, action: PayloadAction<responseNaver>) => {
          state.navers.push(action.payload);
          state.isLoading = false;
        }
      )
      //Put
      .addCase(putNaverAPI.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        putNaverAPI.fulfilled,
        (state, action: PayloadAction<responseNaver>) => {
          state.navers = state.navers.filter(
            naver => naver.id !== action.payload.id
          );
          state.navers.push(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(putNaverAPI.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      //Delete
      .addCase(deleteNaverAPI.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteNaverAPI.fulfilled, (state, action) => {
        state.navers = state.navers.filter(
          naver => naver.id !== action.meta.arg.idNaver
        );
        state.isLoading = false;
      })
      .addCase(deleteNaverAPI.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default naversSlice.reducer;
