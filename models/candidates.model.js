import mongoose from "mongoose";

const candidatesSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  residence_address: {
    street1: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
      required: true,
    },
  },
  permanent_address: {
    street1: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
      required: true,
    },
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "files" }],
});

const candidates = mongoose.model("candidates", candidatesSchema);

export default candidates;
