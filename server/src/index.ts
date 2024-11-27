import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./mongo.config";
import cors from "cors";


configDotenv();

const app = express();

const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors({ origin: '*', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.json({success:true,message:"Hello World"})
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/role", require("./routes/role"));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
