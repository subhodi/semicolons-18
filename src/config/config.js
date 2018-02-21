const path = require('path');

module.exports = {
    'development':{
        'workDir':path.resolve(__dirname+"/../../"+"binary_storage"),
    },
    'production':{
        'workDir':"/tmp/procution/",
    }
}