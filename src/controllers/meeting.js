
const Meeting = require('../models/meeting');
const github = require('./github');

let insert = (req, res, next) => {
    const githubToken = req.body.githubToken;
    const owner = req.body.owner;
    const repo = req.body.repo;
    github.authenticate(githubToken, owner, repo);
    github.getContributers().then((result) => {
        const members = result.data;
        github.getRepoIssues().then((result) => {
            const issues = result.data;
            console.log(members[0]);
            const meeting = new Meeting({
                name: repo,
                members: members,
                issues: issues
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

let get = (req, res, next) => {
    const query = req.params.name ? { 'name': req.params.name } : {};
    Meeting.find(query, (err, docs) => {
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

module.exports = {
    insert,
    get,
    update
}