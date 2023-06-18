import express, { ErrorRequestHandler } from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import routes from "./routes";
import Error from "./classes/Error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// not found
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error();
    error.status = 404;
    // console.log(error)
    next(error);
});
  
// catch all
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log(error);
    // console.log(req);
    // console.log(res);
    // console.log(next);
    res.status(error.status || 500);
    res.json({ error: error.message });
});

app.listen(3001);