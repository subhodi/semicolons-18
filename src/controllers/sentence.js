const Meeting = require('../models/meeting');
const Sentence = require('../models/sentence');

const sentenceUtil = require('../helpers/sentence');

// All project sentences
let getAll = (req, res, next) => {
    sentenceUtil
        .getSentencesByProject()
        .then(docs => {
            res.send({
                status: 200,
                message: docs
            })
        }).catch(err => {
            return next(err);
        })

}

// Specific meeting sentence
let get = (req, res, next) => {
    const name = req.params.name;
    sentenceUtil
        .getSentencesByMeeting(name)
        .then(sentences => {
            res.send({
                status: 200,
                message: sentences
            })
        }).catch(err => {
            return next(err);
        })
}

module.exports = {
    getAll,
    get
}
