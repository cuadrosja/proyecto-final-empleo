import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Empleo } from "./empleo";

@Entity('empresa')
export class Empresa {
    @PrimaryGeneratedColumn({ name: 'id_empresa' })
    idEmpresa: number;

    @Column({ name: 'nombre_empresa', length: 150 })
    nombreEmpresa: string;

    @Column({ name: 'email', unique: true, length: 100 })
    email: string;

    @Column({ name: 'descripcion', type: 'text', nullable: true })
    descripcion: string;

    @Column({ name: 'telefono', length: 20, nullable: true })
    telefono: string;

    @Column({ name: 'direccion', type: 'text', nullable: true })
    direccion: string;

    @Column({ name: 'logo_url', type: 'text', nullable: true })
    logoUrl: string;

    @OneToMany(() => Empleo, (empleo) => empleo.empresa)
    empleos: Empleo[];
}