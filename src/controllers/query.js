const Meeting = require('../models/meeting');

let getActionItemsForUser = (req, res, next) => {
    //     const query = { 'projectName': process.env.REPO, 'name': req.params.name, 'actionItems': { $elemMatch: { 'status': req.params.status } } };
    const query = { 'projectName': process.env.REPO, 'name': req.params.name };
    Meeting.findOne(query, 'actionItems', (err, docs) => {
        if (err) { return next(err); }
        else {
            let newDocs;
            if (docs) {
                newDocs = docs.actionItems.reduce((filtered, doc) => {
                    if (doc.assignees.indexOf(req.params.username) > -1) {
                        filtered.push(doc);
                    }
                    return filtered;
                }, []);
            }
            res.send({
                status: 200,
                message: newDocs
            })
        }
    });
}

let getIssuesForUser = (req, res, next) => {
    const name = req.params.name;
    const username = req.params.username;
    Meeting.aggregate([{ $match: { projectName: process.env.REPO, name: name } }]).
        unwind('issues').match({ 'issues.assignees.login': { $in: [username] } }).
        exec((err, result) => {
            if (err) {
                return next(err);
            } else {
                res.send({
                    status: 200,
                    message: result
                })
            }
        });
}

module.exports = {
    getActionItemsForUser,
    getIssuesForUser
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