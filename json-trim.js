const fs = require('fs');
const ndjson = require('ndjson');

// YELP JSON FILE TRIM SCRIPT

// World's worst file and function organization!
// But it works!

// some different consts for files
const TEST_FILE = 'inventory.crud.json';
const INPUT_FILE = '../yelp_academic_dataset_business.json';
const OUTPUT_FILE = 'yelp_business_trimmed.json';

const BUSINESS_INPUT = 'yelp_business_trimmed.json';
const BUSINESS_OUTPUT = 'business_id_map.json';

const BUSINESS_IDS = 'business_id_map.json';

const CHECKIN_INPUT = '../yelp_academic_dataset_checkin.json';
const CHECKIN_OUTPUT = 'yelp_checkin_trimmed.json';

const REVIEW_INPUT = '../yelp_academic_dataset_review.json';
const REVIEW_OUTPUT = 'yelp_review_trimmed.json';

const TIP_INPUT = '../yelp_academic_dataset_tip.json';
const TIP_OUTPUT = 'yelp_tip_trimmed.json';

const PHOTOS_INPUT = '../photos.json';
const PHOTOS_OUTPUT = 'yelp_photos_trimmed.json';


// create function that represents stream
// one line of data comes in, checks if it is Las Vegas, NV or Toronrto, ON
// if it is gets passed through and trimmed (remove is_open, attributes.BusinessParking) 
// written to the new output json


const writeToFile = (data, filename) => {
    if (!data) {
        return;
    }
    fs.appendFile(filename, data + '\n', (err) => {
        if (err) throw err;
    });
};

// enter string of "city, state"
const filterStateCity = (trimmedData, ...cityState) => {
    for (let i = 0; i < cityState.length; i++) {
        if (trimmedData.state == cityState[i][1] && trimmedData.city == cityState[i][0]) {
            return trimmedData;
        }
    }
    delete trimmedData;
    return;
    // if (!(cityState.includes(trimmedData.state) && cities.includes()) &&
    // !(trimmedData.state == "ON" && trimmedData.city == "Toronto")) {
    //     delete trimmedData;
    //     return;
    // }
    // return trimmedData;

}

//
const trimBusiness = (filename) => fs.createReadStream(filename)
    .pipe(ndjson.parse())
    .on('data', (data) => {
        return new Promise((res, rej) => {
            if (data?.attributes?.RestaurantsPriceRange2) {
                data.priceRange = data.attributes.RestaurantsPriceRange2;
                delete data.is_open;
                delete data.attributes;
                res(data);
            }
        }).then((data) => {
            return filterStateCity(data, ["Toronto", "ON"], ["Las Vegas", "NV"]);
        })
            .then((filteredData) => { // Toronto and Las Vegas
                return JSON.stringify(filteredData);
            }).then(data => { writeToFile(data, OUTPUT_FILE) });
    });


// sort through trimmed business json and collect all the business ids
// make this into a map for faster retrieval!

const trimByBusinessId = (input, output) => {
    let container = new Map;
    fs.createReadStream(input)
        .pipe(ndjson.parse())
        .on('data', (data) => {
            let businessId = data.business_id;
            container.set(businessId, true);
        })
        .on('end', () => {
            let data = JSON.stringify([...container]);
            // console.log("data: " + data);
            fs.writeFile(output, data, (err) => {
                if (err) throw err;
            })
        })
}

// 
const businessFilter = (input, idList, output, selectedFunc) => {
    let businessIds = new Map(JSON.parse(fs.readFileSync(idList)));
    fs.createReadStream(input)
    .pipe(ndjson.parse())
    .on('data', (data) => {
        return new Promise((res, rej) => {
            if (businessIds.get(data.business_id)) {
                res(data);
            }
        }).then((data) => selectedFunc(data)
        ).then((trimmedData) => {
            writeToFile(trimmedData, output);
        })
        .catch((err) => {
            console.log("not found");
        });
    }).on('end', () => {
        console.log("Finished trimming!");
    })

}

const checkInFilter = (data) => {
    const numCheckins = data.date.split(', ').length;
    data.checkin_count = numCheckins;
    delete data.date;
    return JSON.stringify(data);   
}

const reviewFilter = (data) => {
    delete data.user_id;
    delete data.date;
    return JSON.stringify(data);
}

const tipFilter = (data) => {
    delete data.date;
    delete data.user_id;
    return JSON.stringify(data);
}

const photosFilter = (data) => {
    return JSON.stringify(data);
}


// trimByBusinessId(BUSINESS_INPUT, BUSINESS_OUTPUT);
// businessFilter(CHECKIN_INPUT, BUSINESS_IDS, CHECKIN_OUTPUT, checkInFilter);
businessFilter(REVIEW_INPUT, BUSINESS_IDS, REVIEW_OUTPUT, reviewFilter);
// businessFilter(TIP_INPUT, BUSINESS_IDS, TIP_OUTPUT, tipFilter);
// businessFilter(PHOTOS_INPUT, BUSINESS_IDS, PHOTOS_OUTPUT, photosFilter);

