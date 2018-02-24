const Meeting = require('../models/meeting');

let getAll = () => {
    return new Promise((resolve, reject) => {
        Meeting.find({}, (err, docs) => {
            if (err) { reject(err); }
            else {
                resolve(docs);
            }
        });
    });
}

let get = (meetingName) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        Meeting.findOne(query, (err, docs) => {
            if (err) { reject(err); }
            else {
                resolve(docs);
            }
        });
    });
}

let insertDialog = (meetingName, audioFileUrl, dialog) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        const data = {
            audioFileUrl: audioFileUrl,
            dialog: dialog
        }
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

let insertSummary = (meetingName, summary) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        const data = {
            summary: summary
        }
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

let insertNlpResponse = (meetingName, nlpResponse) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        const data = {
            nlpResponse: nlpResponse,
        }
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

let remove = (meetingName) => {
    return new Promise((resolve, reject) => {
        const query = { projectName: process.env.REPO, name: meetingName };
        Meeting.remove(query, (err, docEffected) => {
            if (err) {
                reject(err);
            } else {
                resolve(docEffected);
            }
        });
    });
}

module.exports = {
    get,
    getAll,
    insertDialog,
    insertSummary,
    insertNlpResponse,
    remove
}

{
    // let addKeywordsTosession = (meetingName, sessionId, keywords) => {
    //     return new Promise((resolve, reject) => {
    //         const query = { projectName: process.env.REPO, name: meetingName, 'sessions._id': sessionId };
    //         const data = {
    //             '$set': {
    //                 'sessions.$.keywords': keywords
    //             }
    //         };
    //         const options = { multi: false };
    //         Meeting.update(query, data, options, (err, docEffected) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(docEffected);
    //             }

    //         });
    //     });
    // }

    // let addTranscriptTosession = (meetingName, sessionId, transcript) => {
    //     return new Promise((resolve, reject) => {
    //         const query = { projectName: process.env.REPO, name: meetingName, 'sessions._id': sessionId };
    //         const data = {
    //             '$set': {
    //                 'sessions.$.transcript': transcript
    //             }
    //         };
    //         const options = { multi: false };
    //         Meeting.update(query, data, options, (err, docEffected) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(docEffected);
    //             }

    //         });
    //     });
    // }

    // let addQuestion = (meetingName, statement, status, answer) => {
    //     return new Promise((resolve, reject) => {
    //         const query = { projectName: process.env.REPO, name: meetingName };
    //         const data = {
    //             'questions':
    //                 {
    //                     statement: statement,
    //                     status: status,
    //                     answer: answer,
    //                 }
    //         };
    //         const options = { multi: false };
    //         Meeting.update(query, data, options, (err, docEffected) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(docEffected);
    //             }

    //         });
    //     });
    // }

    // let addActionItem = (meetingName, action, assignees) => {
    //     return new Promise((resolve, reject) => {
    //         const query = { projectName: process.env.REPO, name: meetingName };
    //         const data = {
    //             '$push':
    //                 {
    //                     'actionItems':
    //                         {
    //                             action: action,
    //                             assignees: assignees,
    //                             status: 'pending'
    //                         }
    //                 }
    //         };
    //         const options = { multi: false };
    //         Meeting.update(query, data, options, (err, docEffected) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(docEffected);
    //             }
    //         });
    //     });
    // }

    // let addSummary = (meetingName, summary) => {
    //     return new Promise((resolve, reject) => {
    //         const query = { projectName: process.env.REPO, name: meetingName };
    //         const data = {
    //             'summary': summary
    //         };
    //         const options = { multi: false };
    //         Meeting.update(query, data, options, (err, docEffected) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(docEffected);
    //             }
    //         });
    //     });
    // }
}