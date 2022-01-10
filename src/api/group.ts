import { createAPICall, createFileForm, http } from '~/api/base';
import { IUser } from '~/api/user';

export interface IGroup {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
