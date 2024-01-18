import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../helpers/interfaces";
import { repo } from "../../helpers/repo";
import customError from "../../helpers/customError";
import { User } from "../../entities/user.entity";
import fs from 'fs';
import path from "path";
import { generatePassword } from "../../helpers/passwordHash";

export async function fetchUser(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const user = await repo.userRepo.findOneBy({ id: req.user.id }) as User;
        user.password = "";
        res.status(200).json({
            data: user,
            status: 200
        })
    } catch (err) {
        return next(err)
    }
}

export async function updateUser(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        console.log('====================================');
        console.log("data >> ", data);
        console.log('====================================');
        if (req.fileTypeError) {
            throw customError("Invalid File Format", 400)
        }
        const filename = req.file?.filename as string;
        var user = await repo.userRepo.findOneBy({ id: req.user.id }) as User;
        var oldImg = user.image;
        user.email = data.email;
        user.name = data.name;
        if (data.password) {
            const hashPassword = await generatePassword(data.password) as string;
            user.password = hashPassword;
        }
        user.image = filename;
        if (req.file && oldImg) {
            fs.unlink(path.join(process.cwd(), '/src/uploads/profile/' + oldImg), (err: any) => {
                if (err) {
                    console.log("Error while removing old img > ", err);
                }
            })
        }
        const savedUser = await repo.userRepo.save(user);
        res.status(200).json({
            data: savedUser,
            status: 200
        })
    } catch (err) {
        return next(err);
    }
}