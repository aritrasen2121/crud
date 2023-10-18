import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { ErrorMiddleware } from "./middleware/errors.js";
import { itemRouter } from "./routes/item-router.js";
import bodyParser from "body-parser";
dotenv.config()

export const app=express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",itemRouter)

app.use("*",(req,res,next) =>{
    const err = new Error(`req url ${req.originalUrl} not found`)
    err.statusCode=404
    next(err)
})

app.use(ErrorMiddleware)