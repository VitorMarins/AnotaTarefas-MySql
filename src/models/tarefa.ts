import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'Tarefa' })
export class Tarefa {
    @PrimaryGeneratedColumn({ type: "int" })
  idTarefa?: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'enum', enum: ['Alta', 'Média', 'Baixa'], default: 'Baixa' })
  prioridade: string;

  constructor(nome: string, data: string, prioridade: string) {
    this.nome = nome;
    this.data = data;
    this.prioridade = prioridade;
    }
}