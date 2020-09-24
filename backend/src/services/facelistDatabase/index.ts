import { FaceFragment } from "../../@types/api";

import databaseRaw from "./database.json";

const database =
  (Array.isArray(databaseRaw) &&
    databaseRaw.filter(
      (row): row is FaceFragment =>
        typeof row["id"] === "string" &&
        typeof row["avatar"] === "string" &&
        typeof row["name"] === "string"
    )) ||
  [];

export const useFacelistDatabase = () => {
  const query = ({ offset, length }: { offset: number; length: number }) => {
    const data = {
      results: database.slice(offset, offset + length),
      total: database.length,
    };
    return data;
  };

  return { query };
};
