import mongoose from "mongoose";
import { asyncError } from "../middleware/errors.js";
import Item from '../models/Item.js'
import ErrorHandler from "../utils/ErrorHandler.js";

export const getItems = asyncError(async (req,res,next) =>{
    try {
        const currPage = req.query.currPage || 1
        const skip = 5 * ( currPage -1)
        const items =await Item.find().limit(5).skip(skip)
        return res.status(200).json(items)
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})

export const getItemById = asyncError(async (req,res,next) =>{
    try {
        const id = req.params.id
        let item =await Item.findById(id)
        return res.status(200).json(item)
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})

export const addItem = asyncError(async (req,res,next) =>{
    try {
        const { id, name, description, price } =req.body
        const item= await Item.findOne({id})
        if(item) return next(new ErrorHandler("Item already exists with this id",400))

        const newItem =await Item.create({id, name, description, price})
        return res.status(200).json(newItem)
    } catch (err) {
        return next(new ErrorHandler("Item not added",400))
    }
})


export const updateItem = asyncError(async (req,res,next) =>{
    try {
        const id = req.params.id
        const item = await Item.findById(id)
        if(!item) return next(new ErrorHandler("Item not found with this id",400))
        const { name, description, price } =req.body
        if(!name || !description || !price) return next(new ErrorHandler("Item details not found",400))

        const updatedItem=await Item.findByIdAndUpdate(id,{name, description, price})
        if(!updatedItem) return next(new ErrorHandler("Item not updated",400))
        return res.status(200).json({message: "Item updated"})
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})

export const deleteItem = asyncError(async (req,res,next) =>{
    try {
        const id = req.params.id
        const existingItem = await Item.findById(id)
        if(!existingItem) return next(new ErrorHandler("Item not found with this id",400))
        const item= await Item.findByIdAndRemove(id)
        return res.status(200).json({message: "Item deleted"})
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})