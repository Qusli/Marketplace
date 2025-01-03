import { Exeption } from "./Exeption";

export class ServerErrorExeption extends Exeption {
    constructor() {
        super()

        this.status = 500
        this.message = "Server error"
    }
}