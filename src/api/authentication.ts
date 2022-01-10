import { createAPICall, http } from '~/api/base';
import { IUser } from '~/api/user';

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
  return createAPICall<ILoginResponse>(async () => {
    const response = await http.post<ILoginResponse>('/auth/login', {
      username,
      password,
    });
    return response.data;
  });
}

export async function register(
  email: string,
  username: string,
  password: string,
) {
  return createAPICall<ILoginResponse>(async () => {
    const response = await http.post<ILoginResponse>('/auth/register', {
      email,
      username,
      password,
    });
    return response.data;
  });
}
