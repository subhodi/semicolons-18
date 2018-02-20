
const Meeting = require('../models/meeting');
const Github = require('../models/github');

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
    const query = req.params.name;
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

let insert = (req, res, next) => {
    Github.getContributers().then((result) => {
        const members = result.data;
        Github.getRepoIssues().then((result) => {
            const issues = result.data;
            const meeting = new Meeting({
                name: process.env.REPO,
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
    getAll,
    get,
    insert,
    update
}
