import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    title: string

    @Column({ type: "text", nullable: true })
    description?: string | null

    @Column("real")
    price: number
}