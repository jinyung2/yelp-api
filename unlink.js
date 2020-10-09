const fs = require('fs');

// the unlink will be used to delete the photos from my file 
// system that I do not need. this will be filtered via list of business ID.
fs.unlink('test.txt', (err) => { console.log('deleted')});