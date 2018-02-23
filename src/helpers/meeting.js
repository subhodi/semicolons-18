const Meeting = require('../models/meeting');
const Sentence = require('../models/sentence');
const Github = require('./github');
const request = require('request');

let pythonService = (url, data) => {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: "POST",
            json: true,
            body: data
        }, function (error, response, body) {
            error
                ? reject(error)
                : resolve(body);
        });
    });
}

let sessionPipeline = ((audioSourcePath, rawTranscript, speakerId) => {
    return new Promise((resolve, reject) => {
        addSession(audioSourcePath, rawTranscript, speakerId).then((sessionId) => {
            return pythonService("http://reqres.in/api/create", {
                name: "paul rudd",
                movies: ["I Love You Man", "Role Models"]
            });
        }).then((response) => {
            return addTranscriptTosession(sessionId, rawTranscript);
        }).then((docEffected) => {
            return pythonService("http://reqres.in/api/create", {
                name: "paul rudd",
                movies: ["I Love You Man", "Role Models"]
            });
        }).then((response) => {
            // 
        }).catch((err) => {

        });
    })
});

// "storage.drive.com", "Welcome to meet-asisst", ['1', '2', '3']
let addSession = (meetingName, audioSourcePath, rawTranscript, speakerId) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
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
                reject(err);
            } else {
                Meeting.findOne(query, (err, docs) => {
                    if (err) { reject(err); }
                    else {
                        resolve(docs.sessions[docs.sessions.length - 1]._id);
                    }
                });
            }

        });
    });
}

let addKeywordsTosession = (meetingName, sessionId, keywords) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName, 'sessions._id': sessionId };
        const data = {
            '$set': {
                'sessions.$.keywords': keywords
            }
        };
        const options = { multi: false };
        Meeting.update(query, data, options, (err, docEffected) => {
            if (err) {
                reject(err);
            } else {
                resolve(docEffected);
            }

        });
    });
}

let addTranscriptTosession = (meetingName, sessionId, transcript) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName, 'sessions._id': sessionId };
        const data = {
            '$set': {
                'sessions.$.transcript': transcript
            }
        };
        const options = { multi: false };
        Meeting.update(query, data, options, (err, docEffected) => {
            if (err) {
                reject(err);
            } else {
                resolve(docEffected);
            }

        });
    });
}

let addQuestion = (meetingName, statement, status, answer) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
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
                reject(err);
            } else {
                resolve(docEffected);
            }

        });
    });
}

let addActionItem = (meetingName, action, assignees) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        const data = {
            '$push':
                {
                    'actionItems':
                        {
                            action: action,
                            assignees: assignees,
                            status: 'pending'
                        }
                }
        };
        const options = { multi: false };
        Meeting.update(query, data, options, (err, docEffected) => {
            if (err) {
                reject(err);
            } else {
                resolve(docEffected);
            }
        });
    });
}

let addSummary = (meetingName, summary) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        const data = {
            'summary': summary
        };
        const options = { multi: false };
        Meeting.update(query, data, options, (err, docEffected) => {
            if (err) {
                reject(err);
            } else {
                resolve(docEffected);
            }
        });
    });
}

module.exports = {
    addSession,
    addKeywordsTosession,
    addTranscriptTosession,
    addQuestion,
    addActionItem,
    addSummary,
    sessionPipeline
}
