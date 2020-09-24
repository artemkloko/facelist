import express, { Request, Response, NextFunction } from "express";

import { ErrorRespose } from "./@types/api";
import { apiRouter } from "./routers/api";
import { ResponseError } from "./errors";

const app = express();
const port = 3000;

app.use("/api", apiRouter);

app.use(
  (
    error: Error,
    req: Request,
    res: Response<ErrorRespose>,
    next: NextFunction
  ) => {
    if (error instanceof ResponseError) {
      res.status(error.status).send({ error: error.message }).end();
    } else {
      console.error(error.stack);
      res.status(500).send({ error: "service curently unavailable" });
    }
  }
);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
