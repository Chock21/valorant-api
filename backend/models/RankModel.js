import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Rank = mongoose.model('ranks', mySchema );

export default Rank;