import {Router} from 'express'
import { addItem, deleteItem, getItemById, getItems, updateItem } from '../controllers/item-conn.js'

export const itemRouter=Router()

itemRouter.get("/items",getItems)
itemRouter.get("/items/:id",getItemById)
itemRouter.post("/items",addItem)
itemRouter.put("/items/:id",updateItem)
itemRouter.delete("/items/:id",deleteItem)
