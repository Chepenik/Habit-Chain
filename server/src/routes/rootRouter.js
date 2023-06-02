import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import habitsRouter from "./api/v1/habitsRouter.js";
import giphyRouter from "./api/v1/giphyRouter.js";
import streaksRouter from "./api/v1/streaksRouter.js";
import authGoogleRouter from "./api/v1/authGoogleRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/habits", habitsRouter);
rootRouter.use("/api/v1/giphy", giphyRouter); 
rootRouter.use("/api/v1/streaks", streaksRouter);
rootRouter.use("/api/v1/authGoogle", authGoogleRouter);

export default rootRouter;