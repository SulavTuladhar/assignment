import { NextFunction, Request, Response } from "express";
import { Note } from "../../entities/note.entity";
import { ExtendedRequest } from "../../helpers/interfaces";
import { repo } from "../../helpers/repo";
import { appDataSource } from "../../appDataSource";
import { User } from "../../entities/user.entity";
import customError from "../../helpers/customError";

export async function createNote(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const { title, content } = req.body;
        const note = new Note();
        note.title = title;
        note.content = content;
        note.user = req.user;
        const savedNote = await repo.noteRepo.save(note)
        res.status(201).json({
            data: savedNote,
            status: 201
        })
    } catch (err) {
        return next(err);
    }
}

export async function fetchAllNotes(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const user = req.user as User;
        const notes = await appDataSource
            .getRepository(Note)
            .createQueryBuilder('note')
            .select()
            .where('note.user.id = :user', { user: user.id })
            .getMany();
        res.status(200).json({
            data: notes,
            status: 200
        })
    } catch (err) {
        return next(err);
    }
}

export async function fetchNote(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        const { id } = req.params
        const note = await appDataSource
            .getRepository(Note)
            .createQueryBuilder('note')
            .select()
            .where('note.user.id = :user', { user: user.id })
            .andWhere('note.id = :id', { id: id })
            .getOne()
        if (!note) {
            throw customError("Note not found", 404)
        }
        res.status(200).json({
            data: note,
            status: 200
        })
    } catch (err) {
        return next(err)
    }
}

export async function updateNote(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        const { id } = req.params
        const { title, content } = req.body
        var note = await appDataSource
            .getRepository(Note)
            .createQueryBuilder('note')
            .select()
            .where('note.user.id = :user', { user: user.id })
            .andWhere('note.id = :id', { id: id })
            .getOne()
        if (!note) {
            throw customError("Note not found", 404)
        }
        note.title = title;
        note.content = content;
        await repo.noteRepo.save(note);
        res.status(200).json({
            data: note,
            status: 200
        })
    } catch (err) {
        return next(err);
    }
}

export async function deleteNote(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        const { id } = req.params
        const note = await appDataSource
            .getRepository(Note)
            .createQueryBuilder('note')
            .select()
            .where('note.user.id = :user', { user: user.id })
            .andWhere('note.id = :id', { id: id })
            .getOne()
        if (!note) {
            throw customError("Note not found", 404)
        }
        await appDataSource
            .getRepository(Note)
            .remove(note);
        res.status(200).json({
            message: "Deleted Successfully",
            status: 200
        })
    } catch (err) {
        return next(err)
    }
}

export async function searchNote(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        const user = req.user;
        var notes = await appDataSource
            .getRepository(Note)
            .createQueryBuilder("note")
            .select()
            .where("note.title like :title", { title: `%${data.title}%` })
            .andWhere('note.user.id = :user', { user: user.id })
            .getMany()
        console.log("notes >> ", notes);

        res.status(200).json({
            data: notes,
            status: 200
        })
    } catch (err) {
        next(err);
    }
}