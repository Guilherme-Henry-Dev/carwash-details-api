import  express  from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "./routes"
import servicoRoutes from "./modules/servicos/servico.routes";
import clienteRoutes from "./modules/clientes/cliente.routes";
import veiculoRoutes from "./modules/veiculos/veiculo.routes";
import agendamentoRoutes from "./modules/agendamentos/agendamento.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/servicos", servicoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.listen(env.port, () =>{
    console.log(`Server running att http://localhost:${env.port}`)
})