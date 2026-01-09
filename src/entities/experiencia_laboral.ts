import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./usuario";

@Entity('experiencia_laboral')
export class ExperienciaLaboral {
    @PrimaryGeneratedColumn({ name: 'id_experiencia' })
    idExperiencia: number;

    @Column({ name: 'nombre_empresa', length: 150, nullable: true })
    nombreEmpresa: string;

    @Column({ name: 'puesto_ocupado', length: 100, nullable: true })
    puestoOcupado: string;

    @Column({ name: 'descripcion_tareas', type: 'text', nullable: true })
    descripcionTareas: string;

    @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
    fechaInicio: string;

    @Column({ name: 'fecha_fin', type: 'date', nullable: true })
    fechaFin: string;

    @Column({ name: 'trabajo_actual', default: false })
    trabajoActual: boolean;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
}