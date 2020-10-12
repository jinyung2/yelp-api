const fs = require('fs');
const path = require('path');
const ndjson = require('ndjson');
const readline = require('readline');

const PHOTOS_INPUT = 'yelp_photos_trimmed.json';

// the unlink will be used to delete the photos from my file 
// system that I do not need. this will be filtered via list of business ID.


// PSEUDOCODE //
// use list.txt file -> convert into a map
// go through photos_input and remove the elements of map that exist (photos I need to keep)
// iterate through the map of remaining photo ids and use unlink to delete

let photoList = new Map();

const rl = readline.createInterface({
    input: fs.createReadStream("../list"),
    crlfDelay: Infinity
});
const unlinkPhotos = () => rl.on('line', (line) => {
    photoList.set(line, true);
}).on('close', () => {
    // done with creating map, filter out the ones from photo_id of PHOTOS_INPUT
    fs.createReadStream(PHOTOS_INPUT).pipe(ndjson.parse())
        .on('data', (data) => {
            const photosPath = path.join('.', data.photo_id + '.jpg');
            if (photoList.get("./" + photosPath)) {
                photoList.delete("./" + photosPath);
            }
        }).on('error', (err) => {
            throw err;
        }).on('end', () => {
            console.log(photoList.size);
            // photoList has stuff that needs to be unlinked, iterate and unlink
            for (keys of photoList.keys()) {
                // keys = keys.substr(2);
                // console.log(keys);
                const deletePath = path.join('..','photos', keys);
                fs.unlink(deletePath, (err) => {
                    if (err) console.log("not found");
                    console.log(deletePath, "was deleted.");
                })
            }
        })
});



// const rl = readline.createInterface({
//     input: fs.createReadStream(idList),
//     crlfDelay: Infinity
// });

// fs.createReadStream(PHOTOS_INPUT).pipe(ndjson.parse())
//     .on('data', (data) => {
//         const photosPath = path.join('..', 'photos', data.photo_id + '.jpg');
//         console.log(photosPath);
//         // fs.unlink()
//     }).on('error', (err) => {
//         throw err;
//     })

// fs.unlink('test.txt', (err) => { console.log('deleted')});

