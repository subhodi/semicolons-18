const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    dialog = {
        person: String,
        statement: String,
        timestamp: String
    },
    actionItems = {
        action: String,
        assignees: [String],
        status: String
    };

const meetingSchema = new Schema({
    id: ObjectId,
    name: String,
    projectName: String,
    members: { type: Array, "default": [] },
    issues: { type: Array, "default": [] },
    audioFileUrl: String,
    actionItems: [actionItems],
    summary: Object,
    dialog: [dialog],
    nlpResponse: Object
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
