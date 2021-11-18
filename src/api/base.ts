import axios, { AxiosError } from "axios";
import store from "../store";

export const baseURL = "http://10.0.2.2:3000";

export const http = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer " + store.getState().token.token || "",
  },
});

export interface IErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ResponseError extends Error {
  public readonly message: string = "";
  public readonly status: string = "";

  constructor(error: Partial<IErrorResponse>) {
    super();

    if (Array.isArray(error.message)) {
      error.message = error.message.join("\n");
    }

    this.message = error.message || "";
    this.status = (error.statusCode || "").toString();
  }
}

export async function apiCall<T>(fn: Function): Promise<T> {
  try {
    return await fn();
  } catch (e: any) {
    const error = e as AxiosError<IErrorResponse>;

    if (!error.response) {
      throw error;
    }

    const response = error.response!.data!;
    throw new ResponseError(response);
  }
}
