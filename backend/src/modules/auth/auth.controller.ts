import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/user.entity";
import { comparePassword, generatePassword } from "../../helpers/passwordHash";
import { repo } from "../../helpers/repo";
import customError from "../../helpers/customError";
import { configs } from "../../configs";
const jwt = require('jsonwebtoken')

function createToken(id: number) {
    let token = jwt.sign({
        id: id
    }, configs.JWT_SEC)
    return token
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        let { name, email, password } = req.body;
        var user = new User();
        user.name = name;
        user.email = email;
        const hashPassword = await generatePassword(password) as string;
        user.password = hashPassword;
        await repo.userRepo.save(user);
        res.status(201).json({
            message: 'Staff Created Successfully',
            status: 201
        })
    } catch (err: any) {
        if(err.code === 'ER_DUP_ENTRY'){
            return next({
                message: 'Email is already registered',
                status: 200
            })
        }
        return next(err)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        let { email, password } = req.body;
        const user = await repo.userRepo.findOneBy({ email: email });
        if (!user) {
            throw customError("Invalid credentials", 401);
        }
        const matched = await comparePassword(password, user.password);
        if (!matched) {
            throw customError("Invalid credentials", 401);
        }
        let token = createToken(user.id);
        user.password = "";
        res.status(200).json({
            data: user,
            token,
            status: 200
        })
    } catch (err) {
        return next(err);
    }
}