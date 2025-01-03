import { Exeption } from "./Exeption";

export class BadRequestExeption extends Exeption {
    constructor(message: string = "Bad request") {
        super()

        this.status = 400
        this.message = message
    }
}