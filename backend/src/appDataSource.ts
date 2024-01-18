import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Note } from "./entities/note.entity";

export const appDataSource = new DataSource({
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "assignment",
    "synchronize": true,
    "logging": true,
    "entities": [User, Note]
})