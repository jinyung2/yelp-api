const fs = require('fs');
const ndjson = require('ndjson');

// YELP JSON FILE TRIM SCRIPT

// some different consts for files
const TEST_FILE = 'inventory.crud.json'
const INPUT_FILE = '../yelp_academic_dataset_business.json';
const OUTPUT_FILE = 'yelp_business_trimmed.json'

const stateCityDict = {};

let container = [];

const streamPromise = new Promise((res, rej) => {
    fs.createReadStream(INPUT_FILE)
        .pipe(ndjson.parse())
        .on('data', (data) => {
            if (!stateCityDict[data.state]) {
                stateCityDict[data.state] = [data.city];
            } else {
                if (!stateCityDict[data.state].find(e => e == data.city)) {
                    stateCityDict[data.state].push(data.city);
                }
            }
        })
        .on('end', () => {
            res();
        });
    });
        

    // fs.createReadStream(INPUT_FILE)
    //     .pipe(ndjson.parse())
    //     .on('data', (data) => {
    //         return new Promise((res, rej) => {
    //             res(data);
    //         }).then((data) => {
    //             state.add(data.state);
    //             city.add(data.city);
    //         })

                // delete fields here

                //
                // return new Promise((res, rej) => {
                //     res(JSON.stringify(data) + '\n');
                // })
                // .then(() => {

                // }) 
                // .then((data) => {
                //     fs.appendFile(OUTPUT_FILE, data, (err) => {
                //         if (err) {
                //             throw err;
                //         }
                //         console.log('data appended');
                //     });
                // })
        //         .catch(err => { console.log(err) });
        // })

// streamPromise.then(() => {
//     fs.createWriteStream('test.json')
// }).then((data) => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

streamPromise.then(() => {
    const data = JSON.stringify(stateCityDict, null, 2);
    fs.writeFile('state-city.json', data, (err) => {
        if (err) throw err;
        console.log("successfully wrote file");
    })
}).catch(err => {
    console.log('lol error');
})
// fs.writeFileSync()