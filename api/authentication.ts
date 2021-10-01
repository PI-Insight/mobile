import axios, { AxiosError } from 'axios';

import Constants from "expo-constants";
import { Alert } from 'react-native';
const { manifest } = Constants;
const uri = `${manifest!.debuggerHost!.split(':').shift()}:3001`;

const http = axios.create({
  baseURL: 'http://10.0.2.2:3001'
})

export class ResponseError extends Error {

  public readonly message: string = '';
  public readonly status: string = '';

  constructor(error: Partial<IErrorResponse>) {
    super();
    this.message = error.message || '';
    this.status = error.status || '';
  }

}

interface ILoginResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
    },
    token: {
      token: string;
      expiration: string;
      id: number;
    }
  }
}

interface IErrorResponse {
  status: 'error';
  message: string;
}

export async function login(email: string, password: string) {
  try {
    const response = await http.post<ILoginResponse>('/auth/login', { email, password });
    return response.data;
  }
  catch(e: any) {
    const error = e as AxiosError<IErrorResponse>;
    const response = error.response!.data!;
    throw new ResponseError(response)
  }
}

export async function register(email: string, username: string, password: string) {
  try {
    const response = await http.post<ILoginResponse>('/auth/signup', { email, username, password });
    return response.data;
  }
  catch(e: any) {
    const error = e as AxiosError<IErrorResponse>;
    const response = error.response!.data!;
    throw new ResponseError(response)
  }
}
