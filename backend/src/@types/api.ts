export type DataResponse<Data> = {
  data: Data;
};

export type ErrorRespose = {
  error: string
}

export type FaceFragment = {
  id: string;
  avatar: string;
  name: string;
};
