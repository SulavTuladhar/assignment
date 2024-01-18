import { appDataSource } from "../appDataSource";
import { Note } from "../entities/note.entity";
import { User } from "../entities/user.entity";

export const repo = {
    userRepo: appDataSource.getRepository(User),
    noteRepo: appDataSource.getRepository(Note)
}