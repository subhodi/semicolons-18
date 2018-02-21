const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    session = {
        id: Number,
        audioFileUrl: String,
        rawTranscript: Object,
        speakerId: [String],
        keywords: [String],
        transcript: Object
    },
    question = {
        statement: String,
        status: String,
        answer: String,
    },
    actionItems = {
        action: String,
        assignees: [String],
        status: Boolean
    };

const meetingSchema = new Schema({
    id: ObjectId,
    name: String,
    members: { type: Array, "default": [] },
    issues: { type: Array, "default": [] },
    sessions: [session],
    questions: [question],
    actionItems: [actionItems],
    summary: String

});

meetingSchema.pre('save', function (next) {
    next();
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
