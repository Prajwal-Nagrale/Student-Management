const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Student=new Schema({
    rollNo: { type: Number, required: true, unique: true },
    name: {  type: String, required: true },
    className: {  type: String, required: true },
    subjects: {  type: [String], required: true },
},{
    timestamps: true
});

module.exports = mongoose.model('Student', Student);