const request = require('request');

const Meeting = require('../models/meeting');
const Github = require('../helpers/github');
const meetingUtil = require('../helpers/meeting');

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

let summary = (req, res, next) => {
    const meetingName = req.body.name;
    meetingUtil.getSummary(meetingName).then(response => {
        res.send({
            status: 200,
            message: response
        })
    }).catch(err => {
        return next(err);
    });
}

module.exports = {
    getAll,
    get,
    populate,
    summary
}
