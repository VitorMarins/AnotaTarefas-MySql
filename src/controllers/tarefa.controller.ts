import { Request, Response } from "express";
import { Tarefa } from "../models/tarefa";
import tarefaRepository from "../repositories/tarefa.repository";



export default class TarefaController {

    async create(req: Request, res: Response) {
        if (!req.body.nome) {
            res.status(400).send({
                message: "Não pode ser vazia a tarefa!"
            });
            return;
        }

        try {
            const Tarefa: Tarefa = req.body;
            const savedTarefa = await tarefaRepository.save(Tarefa);
            res.status(201).send(savedTarefa);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar uma tarefa."
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const Tarefas = await tarefaRepository.retrieveAll();
            res.status(200).send(Tarefas);
        } catch (err) {
            res.status(500).send({
                message: "Erro encontrado quando estava se fazendo a busca por todas as tarefas."
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const Tarefa = await tarefaRepository.retrieveById(id);
            if (Tarefa) res.status(200).send(Tarefa);
            else
                res.status(404).send({
                    message: `Não foi encontrado nenhuma tarefa com esse id=${id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error não foi possível retornar a tarefa com id=${id}.`
            });
        }
    }

    async findName(req: Request, res: Response) {
        const nome: string = req.params.nome;

        try {
            const Tarefa = await tarefaRepository.retrieveByNome(nome);
            if (Tarefa) res.status(200).send(Tarefa);
            else
                res.status(404).send({
                    message: `Não foi encontrado nenhuma tarefa com esse nome=${nome}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error não foi possível retornar a tarefa com nome=${nome}.`
            });
        }
    }

    async update(req: Request, res: Response) {
        let Tarefa: Tarefa = req.body;
        Tarefa.idTarefa = parseInt(req.params.id);

        try {
            await tarefaRepository.update(Tarefa);
            res.send({
                message: "Tarefa atualizada com sucesso!"
            });
        } catch (err) {
            res.status(500).send({
                message: `Error ao atualizar a tarefa com id=${Tarefa.idTarefa}.`
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await tarefaRepository.delete(id);

            if (num == 1) {
                res.send({
                    message: "Tarefa deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar a tarefa com id=${id}. A tarefa não tenha sido encontrada.`,
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `A tarefa com id==${id}, não pode ser deletada.`
            });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await tarefaRepository.deleteAll();

            res.send({ message: `${num} tarefas foram deletadas com sucesso!` });
        } catch (err) {
            res.status(500).send({
                message: "Algum erro ocorreu enquato deletava todas as tarefas."
            });
        }
    }

}