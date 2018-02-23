const Meeting = require('../models/meeting');
const Sentence = require('../models/sentence');
// {
//     from: 'kevin',
//         to: 'Sagar',
//             sentence: 'What is the update on oath login?',

//                 tags: ['issue-24'],
// }

let addSentence = (meetingName, sentence) => {
    Meeting.findOne({ projectName: process.env.REPO, name: meetingName }, '_id', (err, doc) => {
        let sentence = new Sentence({
            meetingId: doc._id,
            sentence: sentence
        });
        sentence.save((err) => {
            console.log(err);
        })
    })
}

let getSentences = (meetingName) => {
    return new Promise((resolve, reject) => {
        Meeting.findOne({ projectName: process.env.REPO, name: meetingName }, '_id', (err, doc) => {
            Sentence.find({ meetingId: doc._id }, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    });

}

module.exports = {
    addSentence
}
