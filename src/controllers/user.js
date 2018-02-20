const  User =require('../models/user');

let insert = (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        date: new Date(),
    });
    user.save((err) => {
        if (err) { return next(err); }
        else {
            res.send({
                status: 200,
                message: 'User data insertion successfull'
            })
        }
    });
}

let get = (req, res, next) => {
    const find = req.params.name ? { 'name': req.params.name } : {};
    User.find(find, (err, docs) => {
        if (err) { return next(err); }
        else {
            res.send({
                status: 200,
                message: docs
            })
        }
    });
}

module.exports= {
    insert,
    get
}