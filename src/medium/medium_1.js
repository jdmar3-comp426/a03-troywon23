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
    let arraySort = array.sort(function(a, b) { 
        return a - b;
    });
    let middle = arraySort.length/2
    let median = 0;
    if ((array.length % 2) == 0) {
        median = (array[middle - 1] + array[middle]) / 2
        return median;
    } else {
        median = (array[middle - 0.5]);
        return median;
    }
}


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
    let ArrLength = array.length;
    let ArrSum = 0;
    let ArrMin = 9999999999999;
    let ArrMax = -9999999999999;
    let ArrVariance = 0;
    let ArrStandard_deviation = 0;
  
    let ArrMedian = getMedian(array);
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];

        if (array[i] < min) {
            min = array[i];
        }
        if (array[i] > max) {
            max = array[i];
        }
        
        
    }
    let ArrMean = sum/length;
    ArrVariance = variance(array, mean);
    standard_deviation = Math.sqrt(ArrVariance);
    // const dict = [{length: length}, {sum: sum}];
    let myDictionary = ({
        length: ArrLength,
        sum: ArrSum,
        mean: ArrMean,
        median: ArrMedian,
        min: ArrMin,
        max: ArrMax,
        variance: ArrVariance,
        standard_deviation: ArrStandard_deviation
    });
  
    return myDictionary;
}
