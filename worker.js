const dns = require('dns');
const chalk = require('chalk');
const fs = require('fs');

let hosts = JSON.parse(process.argv[2]);
let id = process.argv[3];

let hostExists = (host) => {
    return new Promise((resolve) => {
        dns.lookup(host, (error) => {
            resolve({host, exists: !error});
        });
    });
};

Promise.all(hosts.map(hostExists)).then((listOfStatus) => {
    fs.writeFile("output/out"+id+".json", JSON.stringify(listOfStatus), (err) => {
        if(err){
            return console.log(err);
        }
        console.log("File SAVED!");
    });
})