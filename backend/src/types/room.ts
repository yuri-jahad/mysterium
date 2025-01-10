export type flag = "fr";

export interface RoomCreate {
  flag: flag;
  code: string;
  token: string;
  isPrivate: boolean;
  createAt: number;
}
