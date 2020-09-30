const { raw } = require('express');
const fs = require('fs');

let rawdata = fs.readFileSync('/home/jin/Downloads/inventory.crud.json');
let trimmed = rawdata.toString().split('\n')
.filter(entry => entry != "")
.map(entry => {
    jsonEntry = JSON.parse(entry);
    delete jsonEntry.item;
    delete jsonEntry.qty;
    return jsonEntry;
})

let data = JSON.stringify({...trimmed});
console.log(data);
fs.writeFileSync('inventory-trimmed.json', data);