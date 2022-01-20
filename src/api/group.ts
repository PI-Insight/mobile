import { createAPICall, createFileForm, http } from '~/api/base';
import { IUser } from '~/api/user';

export interface IGroup {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  members: IUser[];
  owner: IUser;
}

export async function getGroup(id: number) {
  return createAPICall<IGroup>(async () => {
    const response = await http.get<IGroup>(`/groups/${id}`);
    return response.data;
  });
}
