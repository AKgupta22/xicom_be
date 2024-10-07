import { uploadToCloudinary } from "../services/cloudinaryServices.js";

export const uploadBulkFilesToCloudinary = async (req, res, next) => {
  const files = req.files;
  let uploadsData = [];
  if (Array.isArray(files)) {
    const filesPromises = files.map((file) => uploadToCloudinary(file?.buffer));
    try {
      const data = await Promise.all(filesPromises);
      uploadsData = data?.map((file) => {
        return {
          file_id: file?.public_id,
          file_name: file?.display_name,
          file_type: file?.format,
          file_url: file?.secure_url,
        };
      });
    } catch (error) {
      console.log(error, "Error while uploading files");
      return res
        .status(500)
        .json({ error: true, message: "Error while uploading files" });
    }
  }
  req.body.uploadsData = uploadsData;
  next();
};
