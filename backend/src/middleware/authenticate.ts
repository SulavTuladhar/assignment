import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../helpers/interfaces";
import { configs } from "../configs";
import { repo } from "../helpers/repo";
import { User } from "../entities/user.entity";

const jwt = require('jsonwebtoken');

export default function (req: ExtendedRequest, res: Response, next: NextFunction){
    let token;
    if(req.headers['authorization'])
        token = req.headers['authorization']
    if(!token){
        return next({
            message: 'Auth failed, token not provided',
            status: 401
        })
    }

    jwt.verify(token, configs.JWT_SEC, async function(err: any, decoded: any){
        if(err){
            return next(err)
        }
        try{
            const user = await repo.userRepo.findOneBy({id: decoded.id});
            if(!user){
                next({
                    message: "user doesn't exists in the system",
                    status: 400
                })
            }
            req.user = user as User;
            req.user.password = "";
            next();
        }catch(err){
            return next(err)
        }
    })
}