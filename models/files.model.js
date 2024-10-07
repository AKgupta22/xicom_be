import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
  uploader_id: {
    type: String,
    required: true,
  },
  file_id: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
});

const files = mongoose.model("files", filesSchema);

export default files;
