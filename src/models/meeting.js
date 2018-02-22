const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

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
    summary: String
    // userSummary: [{name:"xya", summary:[]}]
});

meetingSchema.pre('save', function (next) {
    next();
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;

var connection = mongoose.createConnection("mongodb://localhost/meet-assist");

autoIncrement.initialize(connection);

var bookSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String,
    genre: String,
    publishDate: String
});

bookSchema.plugin(autoIncrement.plugin, 'Book');
var Book = connection.model('Book', bookSchema);
const book = new Book({
    title: 'LOT',
    genre: 'axyadfsz',
    publishDate: '2018'
});
book.save((err) => {
    if (err) { console.log('error inserting'); }
    else {
        console.log('Insertyion success');
    }
    })
    
