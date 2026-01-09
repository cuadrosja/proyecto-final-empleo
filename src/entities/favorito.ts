import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Unique } from "typeorm";
import { Usuario } from "./usuario";
import { Empleo } from "./empleo";

@Entity('fav_empleos_guardados')
@Unique(['usuario', 'empleo']) // Evita que el usuario guarde el mismo empleo dos veces
export class Favorito {
    @PrimaryGeneratedColumn({ name: 'id_favorito' })
    idFavorito: number;

    @CreateDateColumn({ name: 'fecha_guardado' })
    fechaGuardado: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.favoritos)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Empleo)
    @JoinColumn({ name: 'id_empleo' })
    empleo: Empleo;
}