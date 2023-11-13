import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

ModuleRoutes(app);
CourseRoutes(app);
app.use(express.json());
Lab5(app);
app.listen(process.env.PORT || 4000);
