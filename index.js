const { fork } = require('child_process');
const fs = require('fs');

let rawdata = fs.readFileSync('dictionary.json');
let dictionary = JSON.parse(rawdata);
let hosts = [];
const domains = [
    ".com", ".org", ".net", ".int", ".edu", ".gov", ".mil"
]
Object.keys(dictionary).forEach(word => {
    for(let i = 0; i < domains.length; i++) {
        hosts.push(word + domains[i]);
    }
});

let worker_id = 1;
while(hosts.length != 0){
    let slice = hosts.splice(0, 1000);
    fork('worker.js', [JSON.stringify(slice), worker_id++]);
}