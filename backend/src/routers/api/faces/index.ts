import { Router } from "express";

import { DataResponse, FaceFragment } from "../../../@types/api";
import {
  LimitNegativeError,
  NextTokenNegativeError,
} from "../../../errors/apiErrors";
import { useFacelistDatabase } from "../../../services/facelistDatabase";

export const apiFacesRouter = Router();

type listFacesRes = DataResponse<{
  items: FaceFragment[];
  nextToken: number | null;
}>;
type listFacesQs = { limit?: string; nextToken?: string };

apiFacesRouter.get<{}, listFacesRes, undefined, listFacesQs>(
  "/list",
  (req, res) => {
    const database = useFacelistDatabase();

    const limit = Number(req.query.limit) || 10;
    if (limit < 0) {
      throw new LimitNegativeError();
    }

    const currentToken = Number(req.query.nextToken) || 0;
    if (currentToken < 0) {
      throw new NextTokenNegativeError();
    }

    const { results: items, total } = database.query({
      offset: currentToken,
      length: limit,
    });

    let nextToken: number | null = currentToken + limit;
    if (nextToken >= total) {
      nextToken = null;
    }

    res.json({ data: { items, nextToken } });
  }
);
