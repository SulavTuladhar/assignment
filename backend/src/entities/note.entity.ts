import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Index({fulltext: true})
    title!: string;

    @Column({type: 'longtext'})
    content !: string;

    @ManyToOne(() => User, (user) => user.notes, {onDelete: 'CASCADE'})
    user!: User
}