import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { apiCall, http } from "./base";
import { IProject } from "./project";

export interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export async function getUser(id: number): Promise<IUser> {
  return apiCall<IUser>(async () => {
    const response = await http.get<IUser>(`/users/${id}`);
    return response.data;
  });
}

export async function getUserProjects(id: number): Promise<IProject[]> {
  return apiCall<IProject[]>(async () => {
    const response = await http.get<IProject[]>(`/users/${id}/projects`);
    return response.data;
  });
}

export async function setUserImage(id: number, uri: string) {
  return apiCall<IUser>(async () => {
    const formData = new FormData();
    const type = "image/" + uri.split(".")[uri.split(".").length - 1];
    const name = uri.split("/").pop();
    formData.append("profile-image", {
      uri,
      name,
      type,
    });
    const response = await http.patch<IUser>(`/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });
}

export async function setUsername(username: string) {
  return apiCall<IUser>(async () => {
    const response = await http.patch<IUser>(`/users`, {
      username,
    });
    return response.data;
  });
}
