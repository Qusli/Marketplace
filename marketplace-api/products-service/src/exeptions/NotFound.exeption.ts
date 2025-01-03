import { Exeption } from "./Exeption";

export class NotFoundExeption extends Exeption {
    constructor(message: string = "Not found") {
        super()

        this.status = 404
        this.message = message
    }
}