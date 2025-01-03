import { Repository } from "typeorm";

import { db } from "..";
import { Product } from "../entities/product.entity";
import { CreateProduct } from "../dto/create-product.dto";
import { Request, Response } from "express";
import { BadRequestExeption } from "../exeptions/BadRequest.exeption";
import { ServerErrorExeption } from "../exeptions/ServerError.exeption";

export class ProdcutsService {
    private readonly _respository: Repository<Product>;

    constructor() {
        this._respository = db.getRepository(Product)
    }

    async get(req: Request, res: Response) {
        const limit: number = !Number.isNaN(+req.query.limit) ? +req.query.limit : 50
        const page: number = !Number.isNaN(+req.query.page) ? +req.query.page : 1

        const offset: number = (limit * page) - limit

        const countAllProduct: number = await this._respository.count()
        const allPages: number = Math.ceil(countAllProduct / limit)

        if (page > countAllProduct) {
            res.status(400).json(new BadRequestExeption())
            return
        }

        this._respository.find({
            take: limit,
            skip: offset
        })
        .then(products => res.status(200).json({
            products,
            currentPage: page,
            allPages
        }))
        .catch(_ => res.status(500).json(new ServerErrorExeption()))
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params.id

        this._respository.findBy({
            id
        })
        .then(product => res.status(200).json(product))
        .catch(_ => res.status(500).json(new ServerErrorExeption()))
    }

    async create(req: Request, res: Response): Promise<void> {
        const body: CreateProduct = req.body
        
        if (!body) {
            res.status(400).json(new BadRequestExeption("Body is empty"))
            return 
        }

        if (!body.title) {
            res.status(400).json(new BadRequestExeption("Product title is empty"))
            return 
        }

        if (!body.price) {
            res.status(400).json(new BadRequestExeption("Product price is empty"))
            return 
        }

        this._respository.insert(body)
        .then(r => res.status(201).json())
        .catch(e => res.status(500).json(new ServerErrorExeption()))
    }

    async updateById(req: Request, res: Response): Promise<void> {
        const id: number = +req.params.id
        const body: CreateProduct = req.body
        
        if (!body) {
            res.status(400).json(new BadRequestExeption("Body is empty"))
            return 
        }

        this._respository.update(id, body)
        .then(_ => res.status(200).json())
        .catch(_ => res.status(500).json(new ServerErrorExeption()))
    }

    async deleteById(req: Request, res: Response): Promise<void> {
        const id: number = +req.params.id

        this._respository.delete(id)
        .then(_ => res.status(200).json())
        .catch(_ => res.status(500).json(new ServerErrorExeption()))
    }
}