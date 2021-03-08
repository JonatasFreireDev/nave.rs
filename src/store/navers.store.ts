/* eslint-disable camelcase */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getNaversAPI,
  deleteNaverAPI,
  postNaverAPI,
  putNaverAPI,
  IdeleteNaverApi,
  IpostNaverApi,
  IputNaverApi,
  IgetNaversApi,
} from '../services/naverService';

import { INaver } from '../Interface/INavers';

interface INaverStore {
  navers: INaver[];
  isLoading: boolean;
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

export const getNaversStore = createAsyncThunk(
  'naver/loadFromApi',
  async ({ token }: IgetNaversApi) => {
    const response = await getNaversAPI({ token });
    return response;
  }
);

export const postNaverStore = createAsyncThunk(
  'naver/createNaver',
  async ({ dataForm, token }: IpostNaverApi) => {
    const response = await postNaverAPI({ dataForm, token });
    return response;
  }
);

export const putNaverStore = createAsyncThunk(
  'naver/updateNaver',
  async ({ dataForm, id, token }: IputNaverApi) => {
    const response = await putNaverAPI({ dataForm, id, token });
    return response;
  }
);

export const deleteNaverStore = createAsyncThunk(
  'naver/deleteThisNaver',
  async ({ idNaver, token }: IdeleteNaverApi) => {
    const { data } = await deleteNaverAPI({ idNaver, token });
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
      .addCase(getNaversStore.pending, state => {
        state.isLoading = true;
      })
      .addCase(getNaversStore.fulfilled, (state, action) => {
        state.navers = action.payload;
        state.isLoading = false;
      })
      .addCase(getNaversStore.rejected, state => {
        state.isLoading = false;
      })
      //Post
      .addCase(postNaverStore.pending, state => {
        state.isLoading = true;
      })
      .addCase(postNaverStore.fulfilled, (state, action) => {
        state.navers.push(action.payload);
        state.isLoading = false;
      })
      .addCase(postNaverStore.rejected, state => {
        state.isLoading = false;
      })
      //Put
      .addCase(putNaverStore.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        putNaverStore.fulfilled,
        (state, action: PayloadAction<responseNaver>) => {
          state.navers = state.navers.filter(
            naver => naver.id !== action.payload.id
          );
          state.navers.push(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(putNaverStore.rejected, state => {
        state.isLoading = false;
      })
      //Delete
      .addCase(deleteNaverStore.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteNaverStore.fulfilled, (state, action) => {
        state.navers = state.navers.filter(
          naver => naver.id !== action.meta.arg.idNaver
        );
        state.isLoading = false;
      })
      .addCase(deleteNaverStore.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default naversSlice.reducer;
