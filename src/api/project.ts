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
