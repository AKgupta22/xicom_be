import express from "express";
import {
  addNewCandidate,
  fetchCandidates,
} from "../controllers/candidate.controller.js";
import { validateCandidateFiles } from "../middlewares/multer.middleware.js";
import { uploadBulkFilesToCloudinary } from "../middlewares/cloudinary.middleware.js";

const candidateRoutes = express.Router();

candidateRoutes.get("/", fetchCandidates);
candidateRoutes.post(
  "/",
  validateCandidateFiles,
  uploadBulkFilesToCloudinary,
  addNewCandidate
);

export default candidateRoutes;
