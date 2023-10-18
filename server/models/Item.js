import { Schema, model } from 'mongoose'

const itemSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    }
})

export default model('item',itemSchema)