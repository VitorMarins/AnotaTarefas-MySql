import "reflect-metadata"
import { DataSource } from "typeorm"
import { config, dialect } from "../config/db.config"
import { Tarefa } from "../models/tarefa"

export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [Tarefa],
    synchronize: false,
    logging: false,
})