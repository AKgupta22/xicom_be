import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import initDBConnection from "./utils/initDBConnection.js";
import candidateRoutes from "./routes/candidate.routes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

await initDBConnection();

app.use("/candidates", candidateRoutes);

const port = process.env.PORT || 8085;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
