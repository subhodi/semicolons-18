const Meeting = require('../models/meeting');
const Github = require('./github');

// "storage.drive.com", "Welcome to meet-asisst", ['1', '2', '3']
let addSession = (audioSourcePath, rawTranscript, speakerId) => {
    const query = { name: process.env.REPO };
    const data = {
        '$push':
            {
                'sessions':
                    {
                        'audioFileUrl': audioSourcePath,
                        'rawTranscript': rawTranscript,
                        'speakerId': speakerId,
                    }
            }
    };
    const options = { multi: false };
    Meeting.update(query, data, options, (err, docEffected) => {
        if (err) {
            console.log(err);
        } else {
            Meeting.findOne(query, (err, docs) => {
                if (err) { console.log(err); }
                else {
                    return docs.sessions[docs.sessions.length - 1]._id;
                }
            });
        }

    });
}

let addKeywordsTosession = (sessionId, keywords) => {
    const query = { name: process.env.REPO, 'sessions._id': sessionId };
    const data = {
        '$set': {
            'sessions.$.keywords': keywords
        }
    };
    const options = { multi: false };
    Meeting.update(query, data, options, (err, docEffected) => {
        if (err) {
            console.log(err);
        } else {
            console.log(docEffected);
        }

    });
}

let addTranscriptTosession = (sessionId, transcript) => {
    const query = { name: process.env.REPO, 'sessions._id': sessionId };
    const data = {
        '$set': {
            'sessions.$.transcript': transcript
        }
    };
    const options = { multi: false };
    Meeting.update(query, data, options, (err, docEffected) => {
        if (err) {
            console.log(err);
        } else {
            console.log(docEffected);
        }

    });
}

let addQuestion = (statement, status, answer) => {
    const query = { name: process.env.REPO };
    const data = {
        'questions':
            {
                statement: statement,
                status: status,
                answer: answer,
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

let addActionItem = (action, assignees) => {
    const query = { name: process.env.REPO };
    const data = {
        'actionItems':
            {
                action: action,
                assignees: assignees,
                status: 'pending'
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



let addSummary = (summary) => {
    const query = { name: process.env.REPO };
    const data = {
        'summary': summary
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

module.exports = {
    addSession,
    addKeywordsTosession,
    addTranscriptTosession,
    addQuestion,
    addActionItem,
    addSummary
}
