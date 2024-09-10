import { AppDataSource } from "../db/data-source";
import { Tarefa } from "../models/tarefa";

class TarefaRepository {
    tarefaRepository = AppDataSource.getRepository(Tarefa);

    async save(tarefa: Tarefa): Promise<Tarefa> {
        try {
            this.tarefaRepository.save(tarefa);
            return tarefa;
        } catch (err) {
            throw new Error("Falha ao criar a tarefa!");
        }
    }

    async retrieveAll(): Promise<Array<Tarefa>> {
        try {
            return this.tarefaRepository.find();
        } catch (error) {
            throw new Error("Falha ao retornar as tarefas!");
        }
    }

    async retrieveById(tarefaId: number): Promise<Tarefa | null> {
        try {
            return this.tarefaRepository.findOneBy({
                idTarefa: tarefaId,
            });
        } catch (error) {
            throw new Error("Falha ao buscar a tarefa!");
        }
    }

    async retrieveByNome(n: string): Promise<Tarefa | null> {
        try {
            return this.tarefaRepository.findOneBy({
                nome: n,
            });
        } catch (error) {
            throw new Error("Falha ao buscar a tarefa!");
        }
    }

    async update(tarefa: Tarefa) {
        const { idTarefa, nome } = tarefa;
        try {
            this.tarefaRepository.save(tarefa);
        } catch (error) {
            throw new Error("Falha ao atualizar a tarefa!");
        }
    }

    async delete(tarefaId: number): Promise<number> {
        try {
            const tarefaEncontrado = await this.tarefaRepository.findOneBy({
                idTarefa: tarefaId,
            });
            if (tarefaEncontrado) {
                this.tarefaRepository.remove(tarefaEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar a tarefa!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            let num = this.tarefaRepository.query("select count(idTarefa) from tarefa;");
            this.tarefaRepository.query("delete from tarefa;");
            return num;
        } catch (error) {
            throw new Error("Falha ao deletar todas as tarefas!");
        }
    }
}

export default new TarefaRepository();