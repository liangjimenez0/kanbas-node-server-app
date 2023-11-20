import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";
// import session from "express-session";

const app = express();

app.use(cors());
app.use(express.json());

Lab5(app);
ModuleRoutes(app);
CourseRoutes(app);
HelloRoutes(app);
app.listen(process.env.PORT || 4000);
