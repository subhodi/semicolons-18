const Meeting = require('../models/meeting');
const meetingService = require('../dataservice/meeting');

let generateDialog = (rawTranscript, speakerId) => {
    return new promise((resolve, reject) => {
        // generate python
        let dialog = [{
            person: 'name',
            statement: 'satement',
            timestamp: 'timestamp'
        }];
        resolve(dialog);
    });
}

let textProcessService = (url, data) => {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: "POST",
            json: true,
            body: data
        }, function (error, response, body) {
            error
                ? reject(error)
                : resolve(body);
        });
    });
}

let newSession = (meetingName, audioFileUrl, rawTranscript, speakerId) => {
    // generate dialog form 
    generateDialog(rawTranscript, speakerId).then((dialog) => {
        // save dailog, audio path in db
        return meetingService.insertDialog(meetingName, audioFileUrl);
    })
}

let getSummary = (meetingName) => {
    // get meeting dialog from db
    // pass dailog to textProcessSerivece
    // return textProcessService("http://reqres.in/api/create", {
    //             name: "paul rudd",
    //             movies: ["I Love You Man", "Role Models"]
    //         });
    // store response in DB
    // send response to UI
    return new Promise((resolve, reject) => {
        meetingService.get(meetingName).then((docs) => {
            return textProcessService("http://reqres.in/api/create", {
                name: "paul rudd",
                movies: ["I Love You ", "Role Models"]
            });
        }).then((nlpResponse) => {
            return meetingService.insertNlpResponse(meetingName, nlpResponse);
        }).then(docsEffected => {
            resolve(docsEffected);
        }).catch(err => {
            reject(err);
        });
    });

}

module.exports = {
    newSession,
    getSummary
}

