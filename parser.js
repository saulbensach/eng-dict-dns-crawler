const fs = require('fs');

let filenames = [];

let data = [];

let existing = []
let not_existing = [];

fs.readdirSync("./output").forEach(file => {
    filenames.push(file);
});

filenames.forEach(file => {
    let rawdata = fs.readFileSync("./output/"+file);
    let jData = JSON.parse(rawdata);
    jData.forEach(host => {
        if(host.exists){
            existing.push(host);
        } else {
            not_existing.push(host);
        }
    })
});

console.log("existing hosts: "+existing.length);
console.log("non existing hosts: "+not_existing.length);

fs.writeFile("existing_hosts.json", JSON.stringify(existing), (err) => {
    if(err){
        return console.log(err);
    }
    console.log("File SAVED!");
});

fs.writeFile("not_existing_hosts.json", JSON.stringify(not_existing), (err) => {
    if(err){
        return console.log(err);
    }
    console.log("File SAVED!");
});


