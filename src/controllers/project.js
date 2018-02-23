const Meeting = require('../models/meeting');

let getAll = (req, res, next) => {
    const query = {};
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

let get = (req, res, next) => {
    const query = { 'projectName': process.env.REPO };
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

module.exports = {
    getAll,
    get
}
