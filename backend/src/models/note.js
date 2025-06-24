import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    category:{type:String, required:true},
    color:{type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    createdAt:{type:Date, default:Date.now},
});

const Note = mongoose.model("Note", noteSchema);

export default Note;