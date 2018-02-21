const child_process = require('child_process');

const spawn = child_process.spawn;

let insert = () => {
    let pythonProcess = spawn('python', ['python_scripts/text.py', 'data1', 'data2']);
    pythonProcess.stdout.on('data', function (data) {
        console.log(JSON.parse(data.toString()));
    });

    pythonProcess.stderr.on('data', function (data) {
        console.log('Error');
    });
}

module.exports = insert;
