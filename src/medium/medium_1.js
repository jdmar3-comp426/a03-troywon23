import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    return array.reduce((previousValue, currentValue) => previousValue + currentValue);
    
}
// console.log(getSum([1,2,3,4,5]));


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array = array.sort((a, b) => a - b);
    console.log(array);
    let middle = array.length/2
    let median = 0;
    if ((array.length % 2) == 0) {
        median = (array[middle - 1] + array[middle]) / 2
        return median;
    } else {
        median = (array[middle - 0.5]);
        return median;
    }
}

let array = [3,2,5,6,2,7,4,2,7,5];
console.log(getMedian(array));

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let length = array.length;
    let sum = 0;
    let min = 9999999999999;
    let max = -9999999999999;
    let variance = 0;
    let standard_deviation = 0;
  
    let median = getMedian(array);
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];

        if (array[i] < min) {
            min = array[i];
        }
        if (array[i] > max) {
            max = array[i];
        }
        
        
    }
    let mean = sum/length;
    for (let i = 0; i < array.length; i++) {
        variance = variance + ((array[i] - (sum/array.length)) ** 2);
        
        
    }
    variance = (variance / (array.length));
    standard_deviation = (variance ** (1/2));
    // const dict = [{length: length}, {sum: sum}];
    return {length: length, sum: sum, mean: mean, median: median, min: min, max: max, variance: variance, standard_deviation: standard_deviation};
}
// console.log(getStatistics([3,2,4,5,5,5,2,6,7]));