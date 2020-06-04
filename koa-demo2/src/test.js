const fetch = require('node-fetch')
fetch('http://127.0.0.1:3000/getJson')
    .then(res => res.json())
    .then(json => console.log(json));

// exec cmd test
/*var exec = require('child_process').exec;
function execute(cmd){
    exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.error(error);
        }
        else{
            console.log("success");
        }
    });
}
execute('mspaint');*/