import { Router } from "express";

import { apiFacesRouter } from "./faces";

export const apiRouter = Router();
apiRouter.use("/faces", apiFacesRouter);
