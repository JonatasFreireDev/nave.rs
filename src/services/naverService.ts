import api from './api';
import { INaver } from '../Interface/INavers';

interface IpostNaverApi {
  token?: string;
  dataForm: ISignUpFormData;
}

interface IgetNaverApi {
  token?: string;
  id: string;
}

interface IgetNaversApi {
  token?: string;
}

interface IputNaverApi {
  token?: string;
  id: string;
  dataForm: ISignUpFormData;
}

interface IdeleteNaverApi {
  token?: string;
  idNaver: string;
}

interface ISignUpFormData {
  name: string;
  birthdate: string;
  project: string;
  job_role: string;
  admission_date: string;
  url: string;
}

export const getNaversAPI = async ({ token }: IgetNaversApi) => {
  const { data } = await api.get<INaver[]>(`/navers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getNaverAPI = async ({ id, token }: IgetNaverApi) => {
  const { data } = await api.get<INaver>(`/navers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const postNaverAPI = async ({ dataForm, token }: IpostNaverApi) => {
  const { data } = await api.post<INaver>(`/navers`, dataForm, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const putNaverAPI = async ({ id, dataForm, token }: IputNaverApi) => {
  const { data } = await api.put<INaver>(`/navers/${id}`, dataForm, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteNaverAPI = async ({ idNaver, token }: IdeleteNaverApi) => {
  const response = await api.delete(`/navers/${idNaver}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export type {
  IgetNaversApi,
  IdeleteNaverApi,
  IgetNaverApi,
  IpostNaverApi,
  IputNaverApi,
};
