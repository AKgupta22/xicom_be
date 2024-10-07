import candidates from "../models/candidates.model.js";
import files from "../models/files.model.js";

export const getAllCandidates = async () => {
  try {
    const data = await candidates.find();
    return data;
  } catch (error) {
    throw new Error("Error fetching candidate: " + error.message);
  }
};

const createFiles = async (fileList) => {
  try {
    const newFileList = await files.insertMany(fileList);
    return newFileList;
  } catch (error) {
    throw new Error("Error creating new file: " + error.message);
  }
};

export const addNewCandidateRecord = async (candidateData, filesData) => {
  try {
    const data = new candidates(candidateData);
    const newFilesData = filesData?.map((file) => {
      file.uploader_id = data.id;
      return file;
    });
    const uploadedData = await createFiles(newFilesData);
    data.files = uploadedData?.map((uploadFile) => uploadFile._id);
    await data.save();
    return data
  } catch (error) {
    throw new Error("Error fetching candidate: " + error.message);
  }
};
