import  express  from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "./routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(env.port, () =>{
    console.log(`Server running att http://localhost:${env.port}`)
})