import { createAPICall, createFileForm, http } from "./base";
import { IUser } from "./user";

export interface IProject {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  owner?: IUser;
  members?: IUser[];
}

interface ICreateProjectInfos {
  members: number[];
  name: string;
  description: string;
  image?: string;
}
export function createProject(info: ICreateProjectInfos) {
  const { image, ...rest } = info;
  return createAPICall(async () => {
    const response = await http.post<IProject>("/projects", rest);

    if (image) {
      const form = createFileForm(image);
      await http.post("/projects/" + response.data.id + "/image", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return response.data;
  });
}

export async function getProject(id: number) {
  return createAPICall<IProject>(async () => {
    const response = await http.get<IProject>("/projects/" + id);
    return response.data;
  });
}
