import { NextFunction, Request, Response } from "express";
import path from "path";
import { appDataSource } from "./appDataSource";

const express = require('express');
const app = express();
const PORT = 9090;
const cors = require('cors');

appDataSource.initialize()
    .then(() => console.log("Database connection successfull"))
    .catch(err => console.log("Error while connecting to database >> ", err))

app.use(cors());

// Inbuilt Middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(express.static('uploads'));
app.use('/files', express.static(path.join(process.cwd(), '/src/uploads')));

const API_ROUTE = require('./api.router');

app.use('/', API_ROUTE)

// 404 handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next({
        message: 'Page not found',
        status: 404
    })
})

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 400);
    res.json({
        message: err.message || err,
        status: err.status || 400
    })
})

app.listen(PORT, () => {
    console.log(`Successfully listening at port ${9191}`);
})