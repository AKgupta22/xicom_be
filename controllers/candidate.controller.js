import {
  addNewCandidateRecord,
  getAllCandidates,
} from "../services/candidateQueries.js";
import { validateNewCandidate } from "../helpers/validators.js";
import { deleteCloudinaryFiles } from "../services/cloudinaryServices.js";

export const fetchCandidates = async (req, res) => {
  try {
    const data = await getAllCandidates();
    res.json({ error: false, message: "Fetched successfully", data: data });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const addNewCandidate = async (req, res) => {
  try {
    let { isPermanentSameAsResidence, uploadsData, ...candidateData } =
      req.body;
    if (candidateData.residence_address) {
      candidateData.residence_address = JSON.parse(
        candidateData.residence_address
      );
    }
    if (isPermanentSameAsResidence === "true") {
      candidateData.permanent_address = candidateData.residence_address;
    } else if (candidateData.permanent_address) {
      candidateData.permanent_address = JSON.parse(
        candidateData.permanent_address
      );
    }
    const { error } = validateNewCandidate(candidateData);
    if (error) {
      await deleteCloudinaryFiles(uploadsData);
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    candidateData.files = [];
    const data = await addNewCandidateRecord(candidateData, uploadsData);
    res.json({
      error: false,
      message: "Candidate added successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
