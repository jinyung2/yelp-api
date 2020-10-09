const fs = require('fs');
const ndjson = require('ndjson');

// YELP JSON FILE TRIM SCRIPT

// some different consts for files
const TEST_FILE = 'inventory.crud.json';
const INPUT_FILE = '../yelp_academic_dataset_business.json';
const OUTPUT_FILE = 'yelp_business_trimmed.json';

// create function that represents stream
// one line of data comes in, checks if it is Las Vegas, NV or Toronrto, ON
// if it is gets passed through and trimmed (remove is_open, attributes.BusinessParking) 
// written to the new output json
fs.createReadStream(INPUT_FILE)
.pipe(ndjson.parse())
.on('data', (data) => {
    return new Promise((res, rej) => {
        if (data?.attributes?.RestaurantsPriceRange2) {
            data.priceRange = data.attributes.RestaurantsPriceRange2;
            delete data.is_open;
            delete data.attributes;
            res(data);
        }
    }).then((trimmedData) => { // data with is_open removed and pricerange extracted into separate property
        if (!(trimmedData.state == "NV" && trimmedData.city == "Las Vegas") &&
            !(trimmedData.state == "ON" && trimmedData.city == "Toronto")) {
                delete trimmedData;
                return;
            } 
            return trimmedData;
            
    })
    .then((filteredData) => { // Toronto and Las Vegas
            return JSON.stringify(filteredData);
    }).then((data) => {
        if (!data) {
            return;
        }
        fs.appendFile(OUTPUT_FILE, data + '\n', (err) => {
            if (err) throw err;
        })
    })
});