import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: String,
    image: String,
    rol: String,
    descripcion: String,
});

const Agent = mongoose.model('agents', mySchema );

export default Agent;