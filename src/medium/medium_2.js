import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    

    avgMpg: getAvgMpg(mpg_data),
    allYearStats: getAllYearStats(mpg_data),
    ratioHybrids: getRatioHybrids(mpg_data)

};

export function getAvgMpg(data) {
    let city = 0;
    let hwy = 0;

    for (let i = 0; i < data.length; i++) {
        city += data[i].city_mpg;
        hwy += data[i].highway_mpg;
    }
    return {city: city/data.length, highway: hwy/data.length};
}

export function getAllYearStats(data) {
    let year = [];
    for (let i = 0; i < data.length; i++) {
        year[i] = data[i].year;
    }
    return getStatistics(year);
}

export function getRatioHybrids(data) {
    let hybrids = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].hybrid) {
            hybrids++;
        }
    }
    let ans = hybrids/data.length;
    return ans;
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: getAMBYAH(mpg_data)
};

export function getMakerHybrids(data) {
    let map = new Map();
    for (let i = 0; i < data.length; i++) {
        let what = data[i];
        if (what.hybrid == false) {
            continue;
        }
        let id = what.id;
        let make = what.make;
        if (map.get(make) != undefined) {
            map.get(make).push(id);
        }
        else {
            map.set(make, [id]);
        }
    }
    let array = [];
    for (let [key, value] of array) {
        array.push({make: key, hybrid: value});
    }
    array.sort(function(a,b) {
        if (a.hybrid.length < b.hybrid.length) {
            return 1;
        }
        if (a.hybrid.length > b.hybrid.length) {
            return -1;
        }
        if (a.hybrid.length == b.hybrid.length) {
            return 0;
        }
    })
    return array;
}
export function getAMBYAH(data) {
    let stuff = {};
    for (let i = 0; i < data.length; i++) {
        if (!(data[i].year in stuff)) {
                stuff[data[i].year] = {hybridCitySum: 0, hybridHighwaySum: 0, notHybridCitySum: 0, notHybridHighwaySum: 0, numberOfHybrids: 0, numberOfNotHybrids: 0, hybrids: {}, non_hybrids: {}};
            }
        if (data[i].hybrid == true) {
            stuff[data[i].year].numberOfHybrids++;
            stuff[data[i].year].hybridHighwaySum += data[i].highway_mpg;
            stuff[data[i].year].hybridCitySum += data[i].city_mpg;

        }
        if (data[i].hybrid == false) {
            stuff[data[i].year].numberOfNotHybrids++;
            stuff[data[i].year].notHybridCitySum += data[i].city_mpg;
            stuff[data[i].year].notHybridHighwaySum += data[i].highway_mpg;
        }
            }
        let final = {};
        for (let property in stuff) {
            final[property] = {hybrid: {city: stuff[property].hybridCitySum/stuff[property].numberOfHybrids, highway: stuff[property].hybridHighwaySum/stuff[property].numberOfHybrids}, 
                notHybrid: {city: stuff[property].notHybridCitySum/stuff[property].numberOfNotHybrids, highway: stuff[property].notHybridHighwaySum/stuff[property].numberOfNotHybrids}};
        }
        return final;
    
        }
    
    
