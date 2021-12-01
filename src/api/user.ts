import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { createAPICall, createFileForm, http } from "./base";
import { IProject } from "./project";

export interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export async function paginateUsers(limit: number, offset: number) {
  const response = await http.get<IUser[]>("/users", {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
}

export async function getUser(id: number): Promise<IUser> {
  return createAPICall<IUser>(async () => {
    const response = await http.get<IUser>(`/users/${id}`);
    return response.data;
  });
}

export async function getUserProjects(id: number): Promise<IProject[]> {
  return createAPICall<IProject[]>(async () => {
    const response = await http.get<IProject[]>(`/users/${id}/projects`);
    return response.data;
  });
}

export async function setUserImage(uri: string) {
  return createAPICall<IUser>(async () => {
    const formData = createFileForm(uri, "profile-image");
    const response = await http.patch<IUser>(`/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });
}

export async function setUsername(username: string) {
  return createAPICall<IUser>(async () => {
    const response = await http.patch<IUser>(`/users`, {
      username,
    });
    return response.data;
  });
}
