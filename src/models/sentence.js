const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const sentenceSchema = new Schema({
    id: ObjectId,
    meetingId: { type: ObjectId, ref: 'Meeting' },
    projectName: String,
    sentence: Object
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;