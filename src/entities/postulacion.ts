import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Usuario } from "./usuario";
import { Empleo } from "./empleo";

@Entity('postulacion')
export class Postulacion {
    @PrimaryGeneratedColumn({ name: 'id_postulacion' })
    idPostulacion: number;

    @CreateDateColumn({ name: 'fecha_postulacion' })
    fechaPostulacion: Date;

    @Column({ name: 'estado', length: 50, default: 'Pendiente' })
    estado: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Empleo)
    @JoinColumn({ name: 'id_empleo' })
    empleo: Empleo;
}