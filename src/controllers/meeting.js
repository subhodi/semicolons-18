const Meeting = require('../models/meeting');
const Github = require('../helpers/github');
const meetingUtil = require('../helpers/meeting');
const sentenceUtil = require('../helpers/sentence');

let getAll = (req, res, next) => {
    Meeting.find({}, (err, docs) => {
        if (err) { return next(err); }
        else {
            res.send({
                status: 200,
                message: docs
            })
        }
    });
}

let get = (req, res, next) => {
    const query = { projectName: process.env.REPO, name: req.params.name };
    Meeting.findOne(query, (err, docs) => {
        if (err) { return next(err); }
        else {
            res.send({
                status: 200,
                message: docs
            })
        }
    });
}

let update = (req, res, next) => {
    const query = req.body.query;
    const data = req.body.data;
    const options = { multi: true };
    Meeting.update(query, data, options, (err, docEffected) => {
        if (err) { return next(err); }
        else {
            res.send({
                status: 200,
                message: 'Meeting data updation successfull'
            })
        }
    });
}

let populate = (req, res, next) => {
    const meetingName = req.body.name; // 'day1'
    Github.getContributers().then((result) => {
        const members = result.data;
        Github.getRepoIssues().then((result) => {
            const issues = result.data;
            const meeting = new Meeting({
                name: meetingName,
                members: members,
                issues: issues,
                projectName: process.env.REPO
            });
            meeting.save((err) => {
                if (err) { return next(err); }
                else {
                    res.send({
                        status: 200,
                        message: 'Meeting data insertion successfull'
                    })
                }
            });
        }).catch((err) => {
            next(err);
        });

    }).catch((err) => {
        next(err);
    })
}

let newSession = (req, res, next) => {
    const audioSourcePath = req.body.audioSourcePath;
    const rawTranscript = req.body.rawTranscript;
    const speakerId = req.body.speakerId;
    meetingUtil.addSession(audioSourcePath, rawTranscript, speakerId).then((sessionId) => {
        res.send({
            status: 200,
            message: sessionId
        })
        // REST call for keyword detection here(sessionId,rawTranscript)
    }).catch((err) => {
        return next(err);
    });
}

let getActionItemForUser = (req, res, next) => {
    const query = { 'projectName': process.env.REPO, 'name': req.params.name, 'actionItems': { $elemMatch: { 'status': req.params.username } } };
    Meeting.findOne(query, 'actionItems', (err, docs) => {
        if (err) { return next(err); }
        else {
            let newDocs = docs.actionItems.reduce((filtered, doc) => {
                if (doc.assignees.indexOf('subhodi') > -1) {
                    filtered.push(doc);
                }
                return filtered;
            }, []);
            res.send({
                status: 200,
                message: newDocs
            })
        }
    });
}

module.exports = {
    getAll,
    get,
    update,
    populate,
    newSession,
    getActionItemForUser
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