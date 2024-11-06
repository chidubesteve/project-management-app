import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
// ROUTES IMPORT
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.get("/", (req, res) => {
    res.send("Hello, from home route!");
})

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);


// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});