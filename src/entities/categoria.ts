import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Empleo } from "./empleo";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn({ name: 'id_categoria' })
    idCategoria: number;

    @Column({ name: 'nombre_categoria', length: 100, unique: true })
    nombreCategoria: string;

    // --- RELACIONES DE MAPEO (CÓDIGO) ---
    // No existe en la tabla física de la BD. 
    // Es una relación inversa que permite a TypeORM traer los empleos de esta categoría.

    @OneToMany(() => Empleo, (empleo) => empleo.categoria)
    empleos: Empleo[];
}