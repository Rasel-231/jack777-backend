import express, { Application, NextFunction, Request, Response } from "express";

import cors from 'cors'
import globalErrorHandler from "./common/CustomError/CustomGlobalError/globalErrorHandler";
import router from "./Routes/mainRoute";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";





const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//default router
app.use("/api/v1", router)

// app.get("/get", (req: Request, res: Response) => {
//   res.send("Server working properly......");
//   Promise.reject(new Error('Unhandle Promise Rejection'))
// });

//global error handler 
app.use(globalErrorHandler);


//api not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
