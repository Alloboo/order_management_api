import express from "express";
import { uploadFile } from "../controllers/upload.controller";
const uploadRouter = express.Router();

uploadRouter.post('/', uploadFile);

export default uploadRouter;