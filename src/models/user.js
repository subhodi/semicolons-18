const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    name: String,
    email: String,
    date: Date
});

const User = mongoose.model("User", userSchema);
module.exports=  User;