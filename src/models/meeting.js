const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    session = {
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
        status: String
    };

const meetingSchema = new Schema({
    id: ObjectId,
    name: String,
    members: { type: Array, "default": [] },
    issues: { type: Array, "default": [] },
    sessions: [session],
    questions: [question],
    actionItems: [actionItems],
    summary: String,
    projectName: String
    // userSummary: [{name:"xya", summary:[]}]
});

const sentenceSchema = new Schema({
    id: ObjectId,
    meetingId: { type: ObjectId, ref: 'Meeting' },
    sentence: Object
});

meetingSchema.pre('save', function (next) {
    next();
});

const Meeting = mongoose.model('Meeting', meetingSchema);
const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Meeting;

Meeting.findOne({ name: 'meet-assist' }, '_id', (err, doc) => {
    let sentence = new Sentence({
        meetingId: doc._id,
        sentence: {
            from: 'kevin',
            to: 'Sagar',
            sentence: 'What is the update on oath login?',
            tags: ['issue-24'],
        }
    });
    sentence.save((err) => {
        console.log(err);
    })
})
