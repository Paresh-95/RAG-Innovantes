import dotenv from "dotenv";
dotenv.config();
import logger from "./middlewares/logger.js"
import express from "express";
import cors from "cors";

import documentRoutes from "./routes/documentRoutes.js";
import askRoutes from "./routes/askRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);
app.use("/documents", documentRoutes);
app.use("/ask", askRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 RAG Backend running on port ${PORT}`);
});
