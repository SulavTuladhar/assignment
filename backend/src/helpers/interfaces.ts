import { Request } from "express";
import { User } from "../entities/user.entity";

export interface ExtendedError extends Error {
    status: number
}

export interface ExtendedRequest extends Request {
    user: User
    fileTypeError: boolean
}

export interface ExtendedFile extends File {
    mimeType: string
}