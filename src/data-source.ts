import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATASOURCE_HOST,
    port: Number(process.env.DATASOURCE_PORT),
    username: process.env.DATASOURCE_USERNAME,
    password: process.env.DATASOURCE_PASSWORD,
    database: process.env.DATASOURCE_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['build/src/entity/*{.js,.ts}'],
    migrations: [
        "build/src/migrations/**/*.js"
    ],
    subscribers: [],
})