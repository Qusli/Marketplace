import { Request, Response, Router } from "express"
import { ProdcutsService } from "../services/products.service"

const router = Router()

const _service = new ProdcutsService()

router.get("/all", (req: Request, res: Response) => {
    _service.get(req, res)
})

router.get("/:id", (req: Request, res: Response) => {
    _service.getById(req, res)
})

router.post("/create", (req: Request, res: Response) => {
    _service.create(req, res)
})

router.patch("/update/:id", (req: Request, res: Response) => {
    _service.updateById(req, res)
})

router.delete("/delete/:id", (req: Request, res: Response) => {
    _service.deleteById(req, res)
})

export { router as ProductsRouter }