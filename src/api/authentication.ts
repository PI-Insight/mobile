import store from '../store';
import { apiCall, http } from './base';
import { IUser } from './user';

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export async function login(username: string, password: string) {
  return apiCall<ILoginResponse>(async () => {
    const response = await http.post<ILoginResponse>('/auth/login', { username, password });
    return response.data;
  });
}

export async function register(email: string, username: string, password: string) {
  return apiCall<ILoginResponse>(async () => {
    const response = await http.post<ILoginResponse>('/auth/register', { email, username, password });
    return response.data;
  });
}
