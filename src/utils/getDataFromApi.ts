/* eslint-disable camelcase */
import { AxiosResponse } from 'axios';
import api from '../services/api';
import { INaver } from '../Interface/INavers';

interface getNaversProps {
  path: string;
  token?: string;
}

interface postNaverApi {
  dataForm: SignUpFormData;
  token?: string;
}

interface getNaverApi {
  id: string;
  token?: string;
}

interface SignUpFormData {
  name: string;
  birthdate: string;
  project: string;
  job_role: string;
  admission_date: string;
  url: string;
}

// api.defaults.headers.authorization = `Bearer ${token}`;

export const getNaversAPI = async ({ path, token }: getNaversProps) => {
  const { data } = await api.get<INaver[]>(`${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getNaverAPI = async ({ id, token }: getNaverApi) => {
  const { data } = await api.get<INaver>(`/navers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const postNaverAPI = async ({ dataForm, token }: postNaverApi) => {
  const response = await api.post<AxiosResponse>(`/navers`, dataForm, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
