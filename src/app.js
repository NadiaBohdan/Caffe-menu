import express from "express"
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser"
import nunjacks from "nunjucks"
import { fileURLToPath } from "url"

import apiRouter from "./routes/api/index.js"
import ssrRoutes from "./routes/ssr/index.js"
import { errorHandler } from "#middlewares/error.middleware.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

nunjacks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true
})

app.set("view engine", 'njk');

app.use('/api', apiRouter);
app.use('/', ssrRoutes);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server start on http://localhost:${PORT}`);
})