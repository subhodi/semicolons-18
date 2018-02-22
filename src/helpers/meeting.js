const Meeting = require('../models/meeting');
const Github = require('./github');
const request = require('request');

let restAPI = (url, data) => {
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
            restAPI("http://reqres.in/api/create", {
                name: "paul rudd",
                movies: ["I Love You Man", "Role Models"]
            }).then((response) => {
                addTranscriptTosession(sessionId, rawTranscript).then((docEffected) => {
                    restAPI("http://reqres.in/api/create", {
                        name: "paul rudd",
                        movies: ["I Love You Man", "Role Models"]
                    });
                }).catch((err) => {
                    reject(err);
                });
            }).catch((error) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        })
    });
});

// "storage.drive.com", "Welcome to meet-asisst", ['1', '2', '3']
let addSession = (audioSourcePath, rawTranscript, speakerId) => {
    return new Promise((resolve, reject) => {
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

let addKeywordsTosession = (sessionId, keywords) => {
    return new Promise((resolve, reject) => {
        const query = { name: process.env.REPO, 'sessions._id': sessionId };
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

let addTranscriptTosession = (sessionId, transcript) => {
    return new Promise((resolve, reject) => {
        const query = { name: process.env.REPO, 'sessions._id': sessionId };
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

let addQuestion = (statement, status, answer) => {
    return new Promise((resolve, reject) => {
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
                reject(err);
            } else {
                resolve(docEffected);
            }

        });
    });
}

let addActionItem = (action, assignees) => {
    return new Promise((resolve, reject) => {
        const query = { name: process.env.REPO };
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

let addSummary = (summary) => {
    return new Promise((resolve, reject) => {
        const query = { name: process.env.REPO };
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

// sample APIs
// Meeting.
//     aggregate([{ $match: { name: 'meet-assist' } }]).
//     unwind('actionItems').match({ 'actionItems.assignees': { $in: ['sid226'] } }).
//     exec((err, result) => {
//         console.log(err, result);
//     });

// Meeting.
//     aggregate([{ $match: { name: 'meet-assist' } }]).
//     unwind('issues').match({ 'issues.assignees.login': { $in: ['YajneshRai'] } }).
//     exec((err, result) => {
//         console.log(err, result);
//     });

// Meeting.update({ name: 'meet-assist', 'actionItems.action': 'pending' }, {
//     "$set": {
//         "actionItems.$.status": 'completed'
//     }
// }, { multi: true }, (err, docEffected) => {
//     console.log(err, docEffected);
// });