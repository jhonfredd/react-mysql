import  express  from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config.js"

import indexRoutes from "./routes/index.router.js"
import queryRouter from "./routes/taks.router.js"

const app = express();
const __dirname =dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json());

app.use(indexRoutes);
app.use(queryRouter);

app.use(express.static(join(__dirname, '../client/dist')));

app.listen(PORT);
console.log("server is runnig");