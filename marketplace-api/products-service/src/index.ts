import "reflect-metadata"
import "dotenv/config"
import { DB_CONFIG } from "./configuration/db.config"

import * as express from "express"
import * as bodyParser from "body-parser"
import { DataSource } from "typeorm"

import { Logger } from "./utils/Logger"

const logger = new Logger()

export const db = new DataSource(DB_CONFIG)

// DATABASE INITED
db.initialize()
.then(() => bootstrap())
.catch((e) => logger.error(e))

import { LogRequestMiddleware } from "./middlewares/log-request.middleware"

import { ProductsRouter } from "./routers/products.router"

import { SetHeaderJsonMiddleware } from "./middlewares/set-header-json.middleware"
import { LogErrorMiddleware } from "./middlewares/log-error.middleware"
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware"
import { ClientErrorHandlerMiddleware } from "./middlewares/client-error-handler.middleware"

const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000
const SERVER_HOST: string = process.env.SERVER_HOST ? String(process.env.SERVER_HOST) : "localhost"

function bootstrap() {
    const app: express.Express = express()

    // LIBS
    app.use(bodyParser())

    // MIDDLEWARES
    app.use(SetHeaderJsonMiddleware)
    app.use(LogRequestMiddleware)

    // ROUTES
    app.use("/products", ProductsRouter)

    // CUSTOM ERROR HANDLER
    app.use(LogErrorMiddleware)
    app.use(ClientErrorHandlerMiddleware)
    app.use(ErrorHandlerMiddleware)

    app.listen(SERVER_PORT, SERVER_HOST, () => {
        logger.log(`Server start http://${SERVER_HOST}:${SERVER_PORT}`)
    })
}