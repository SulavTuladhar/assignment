import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./note.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email !: string;

    @Column({ nullable: false })
    password!: string;

    @Column()
    image!: string;

    @OneToMany(() => Note, (note) => note.user, {cascade: true})
    @JoinColumn()
    notes!: Note[]
}