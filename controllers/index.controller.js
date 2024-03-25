const { spawn } = require('child_process');

const execPython = arg => {
    return new Promise((resolve, reject) => {
        const py = spawn('python', ['./controllers/python.py', arg]);
        let result = null;
    
        py.stdout.on('data', data => {
            const mystr = data.toString();
            const myjson = JSON.parse(mystr);
            result = myjson;
            //console.log('std.on: ', result);
        });
    
        py.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            reject(data.toString());
        });
    
        py.on('exit', (code) => {
            if (result) {
                resolve(result);
            } else {
                reject(new Error('Python script didn\'t emit a result.'));
            }
        });
    });
};
  

module.exports.index = (req, res) => {  
    execPython(req.params)
        .then(data => res.json(data))
        .catch(error => {
            res.json({
                code: 500,
                data: error
            });
        });
}