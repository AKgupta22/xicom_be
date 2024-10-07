import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "diw15c9xm",
  api_key: "355255489377874",
  api_secret: "Cmbqg6xZdx73LZGIXNYWG9mfFic",
});

export const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteCloudinaryFiles = async (files) => {
  const deletePromise = files?.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(file?.file_id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });
  await Promise.all(deletePromise);
};
