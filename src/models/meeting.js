const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    member = {
        firstName: String,
        lastName: String,
        email: String
    },
    issue = {
        number: Number,
        status: String,
        url: String,
        comment: String,
        assignees: [String]
    },
    question = {
        statement: String,
        answer: String
    },
    todo = {
        action: String,
        assignees: [String]
    };

const meetingSchema = new Schema({
    id: ObjectId,
    name: String,
    members: { type: Array, "default": [] },
    issues: { type: Array, "default": [] },
    questions: [{ question }],
    todos: [{ todo }],

});

meetingSchema.pre('save', function (next) {
    next();
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
