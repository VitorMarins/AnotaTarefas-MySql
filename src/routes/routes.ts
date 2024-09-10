import { Application } from "express";
import TarefaRoutes from "./tarefa.routes";

// Concentrador de rotas
export default class Routes {
  constructor(app: Application) {
    app.use("/anotaTarefas", TarefaRoutes);
  }
}
