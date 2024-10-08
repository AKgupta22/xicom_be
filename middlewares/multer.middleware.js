import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const currentExtension = file.mimetype.split("/")[1];
    const allowedFiles = ["jpg", "png", "pdf", "jpeg"];
    if (!allowedFiles.includes(currentExtension)) {
      return cb(new Error(`${file.mimetype} file type is not allowed`), false);
    }
    cb(null, true);
  },
});

export const validateCandidateFiles = (req, res, next) => {
  upload.array("files",20)(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }
    next();
  });
};
