import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Empresa } from "./empresa";
import { Categoria } from "./categoria";

@Entity('empleo')
export class Empleo {
    @PrimaryGeneratedColumn({ name: 'id_empleo' })
    idEmpleo: number;

    @Column({ name: 'titulo_empleo', length: 150 })
    tituloEmpleo: string;

    @Column({ name: 'puesto', length: 100 })
    puesto: string;

    @Column({ name: 'descripcion', type: 'text' })
    descripcion: string;

    @Column({ name: 'modalidad', length: 50 }) // Presencial, Remoto, Híbrido
    modalidad: string;

    @Column({ name: 'esta_activo', default: true })
    estaActivo: boolean;

    @CreateDateColumn({ name: 'fecha_publicacion' })
    fechaPublicacion: Date;

    @ManyToOne(() => Empresa, (empresa) => empresa.empleos)
    @JoinColumn({ name: 'id_empresa' })
    empresa: Empresa;

    @ManyToOne(() => Categoria, (categoria) => categoria.empleos)
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categoria;
}