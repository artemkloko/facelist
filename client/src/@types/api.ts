export type Response<Data> = {
  data?: Data;
  error?: string;
};

export type FaceFragment = {
  id: string;
  avatar: string;
  name: string;
};

export type ListFacesQueryResult = {
  items?: FaceFragment[];
  nextToken?: string | null;
};

export type ListFacesQueryVariables = {
  limit?: number;
  nextToken?: string | null;
};
