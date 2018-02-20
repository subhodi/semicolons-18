const Github = require('../models/github');

let getAll = (req, res, next) => {
    Github.getRepoIssues().then((issues) => {
        res.send({
            status: 200,
            message: issues.data
        });
    }).catch((err) => {
        next(err);
    })
}

let get = (req, res, next) => {
    const issueNumber = req.params.number;
    Github.getIssue(issueNumber).then((issue) => {
        res.send({
            status: 200,
            message: issue.data
        });
    }).catch((err) => {
        next(err);
    })
}

let insert = (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const milestone = req.body.milestone;
    const labels = req.body.labels;
    const assignees = req.body.assignees;
    Github.createIssue(title, body, milestone, labels, assignees).then((issue) => {
        res.send({
            status: 200,
            message: issue
        });
    }).catch((err) => {
        next(err);
    })
}

let update = (req, res, next) => {
    const issueNumber = req.body.issueNumber;
    const state = req.body.state;
    const title = req.body.title;
    const body = req.body.body;
    const milestone = req.body.milestone;
    const labels = req.body.labels;
    const assignees = req.body.assignees;
    Github.editIssue = (issueNumber, state, title, body, milestone, labels, assignees).then((issue) => {
        res.send({
            status: 200,
            message: issue
        });
    }).catch((err) => {
        next(err);
    })
}

module.exports = {
    getAll,
    get,
    insert,
    update
}