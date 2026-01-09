import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Empleo } from "./empleo";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn({ name: 'id_categoria' })
    idCategoria: number;

    @Column({ name: 'nombre_categoria', length: 100, unique: true })
    nombreCategoria: string;

    @OneToMany(() => Empleo, (empleo) => empleo.categoria)
    empleos: Empleo[];
}