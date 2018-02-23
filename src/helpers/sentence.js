const Meeting = require('../models/meeting');
const Sentence = require('../models/sentence');

// addSentence("day1", {
//     from: 'sagar',
//     to: 'kevin',
//     sentence: 'APP-KEY registartyion suceesss',
//     tags: ['issue-24']
// })
let addSentence = (meetingName, data) => {
    Meeting.findOne({ projectName: process.env.REPO, name: meetingName }, '_id', (err, doc) => {
        let sentence = new Sentence({
            meetingId: doc._id,
            sentence: data,
            projectName: process.env.REPO
        });
        sentence.save((err) => {
            console.log(err);
        })
    })
}

let getSentencesByMeeting = (meetingName) => {
    return new Promise((resolve, reject) => {
        Meeting.findOne({ projectName: process.env.REPO, name: meetingName }, '_id', (err, doc) => {
            Sentence.find({ meetingId: doc._id }, (err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs);
                }
            });
        })
    })
}

let getSentencesByProject = () => {
    const projectName = process.env.REPO;
    return new Promise((resolve, reject) => {
        Sentence.find({ projectName: process.env.REPO }, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    })
}

module.exports = {
    addSentence,
    getSentencesByMeeting,
    getSentencesByProject
}
