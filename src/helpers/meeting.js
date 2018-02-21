const Meeting = require('../models/meeting');
const Github = require('./github');

let addSession = (audioSourcePath, rawTranscript, speakerId) => {
    const query = { name: process.env.REPO };
    const data = {
        '$push':
            {
                'sessions':
                    {
                        id: 1,
                        'audioFileUrl': audioSourcePath,
                        'rawTranscript': rawTranscript,
                        'speakerId': speakerId,
                    }
            }
    };
    const options = { multi: false };
    Meeting.update(query, data, options, (err, docEffected) => {
        if (err) {
            return { status: 'false', message: err };
        } else {
            return { status: 'true', message: docEffected };
        }

    });
}

let addQuestion = () => {

}

let addActionItem = () => {

}

let addSummary = () => {

}

module.exports = {
    addSession,
    addQuestion,
    addActionItem,
    addSummary
}
