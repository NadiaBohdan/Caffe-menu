import express from "express"
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"
import apiRouter from "./routes/api/index.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())

app.use('/api', apiRouter);

app.get('/ad', (req, res) => {
  res.json({message: "Some message"});
})

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server start on http://localhost:${PORT}`);
})