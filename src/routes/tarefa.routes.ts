import { Router } from "express";
import TarefaController from "../controllers/tarefa.controller";


class TarefaRoutes {
  router = Router();
  controller = new TarefaController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {

    // Criar uma nova tarefa.
    this.router.post("/tarefa", this.controller.create);

    // Retornar as tarefas já cadastrados.
    this.router.get("/tarefas", this.controller.findAll);

    // Retorna uma tarefa específica pelo seu id
    this.router.get("/tarefa/:id", this.controller.findOne);

    // Retorna uma tarefa específica pelo seu nome
    this.router.get("/tarefa/nome/:nome", this.controller.findName);

    // Atualizar uma tarefa pelo seu id
    this.router.put("/tarefa/:id", this.controller.update);

    // Deleta uma tarefa pelo seu id
    this.router.delete("/tarefa/:id", this.controller.delete);

    // Deleta todas as tarefas
    this.router.delete("0", this.controller.deleteAll);
  }
}

export default new TarefaRoutes().router;