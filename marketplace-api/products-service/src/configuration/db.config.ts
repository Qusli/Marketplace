import { DataSourceOptions } from "typeorm";

export const DB_CONFIG: DataSourceOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST ?? "localhost",
    port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: false,
}