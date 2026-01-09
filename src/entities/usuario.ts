import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ExperienciaLaboral } from "./experiencia_laboral";
import { Postulacion } from "./postulacion";
import { Favorito } from "./favorito"; // La crearemos a continuación

@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    idUsuario: number;

    @Column({ name: 'nombre', length: 100 })
    nombre: string;

    @Column({ name: 'apellidos', length: 100 })
    apellidos: string;

    @Column({ name: 'email', unique: true, length: 100 })
    email: string;

    @Column({ name: 'telefono', nullable: true, length: 20 }) 
    telefono: string;

    @Column({ name: 'nombre_usuario', unique: true, length: 50 }) 
    nombreUsuario: string;

    @Column({ name: 'contrasena', select: false }) 
    contrasena: string;

    @Column({ name: 'foto_perfil', nullable: true, type: 'text' }) 
    fotoPerfil: string;

    // --- RELACIONES ---

    // Un usuario tiene muchas experiencias laborales
    @OneToMany(() => ExperienciaLaboral, (exp) => exp.usuario)
    experiencias: ExperienciaLaboral[];

    // Un usuario puede tener muchas postulaciones
    @OneToMany(() => Postulacion, (post) => post.usuario)
    postulaciones: Postulacion[];

    // Un usuario puede guardar muchos empleos favoritos
    @OneToMany(() => Favorito, (fav) => fav.usuario)
    favoritos: Favorito[];
}