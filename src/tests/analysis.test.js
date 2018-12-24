// Import of functions to test
import {
  getNthLength,
  findMost,
  findClipping,
} from '../scripts/Data.analysis';

// Mock imports
import {
  mockLightnessLCD,
  mockHLLCD,
} from './helpers/mock.img.js';

// don't need this test, this function's fairly simple
describe('A function that gets n% of length of an array', function() {
  const arr = [1,2,3,4];
  const fracN = 0.39761155133;

  it('should return an integer', function() {
    expect(Number.isInteger(getNthLength(arr, fracN))).toBe(true);
  });

});

describe('A function for finding the most frequent colors', function() {

  xit('should return an array of length 6', function() {
    expect(array.length).toEqual(6);
  });

  xit('should be trying to merge similar colors', function() {
    expect().toBe();
  });

  xit('should be trying to remove entries', function() {
    expect().toBe();
  });

});

describe('A function for finding clipping', function() {
  const wrongFormat = [['11', 'bba22']];
  const wrongFormat2 = {0: 1, 1: 2};
  const correctFormat = [['1', 2], ['3', 4]];


  it('should throw an error when the input is like so [["string", "string"]]', function() {
    expect(() => {findClipping(wrongFormat, wrongFormat.length)}).toThrow();
  });
  xit('should throw an error when the input is like this {0: 1, 1: 2}', function() {
    expect(() => {findClipping(wrongFormat2, wrongFormat2.length)}).toThrow();
  });
  it('should continue running when the input is like this [["num string", num]]', function() {
    expect(() => {findClipping(correctFormat, correctFormat.length)}).toBeTruthy();
  });

  it('should return an array of length 2 when I call it', function() {
    const result = findClipping(mockLightnessLCD);
    expect(result.length).toEqual(2);
  });

  it('should return two numbers when I call it with a known mock', function() {
    const result = findClipping(mockHLLCD);
    const firstResult = parseFloat(result[0]);
    const secondResult = parseFloat(result[1]);

    expect(firstResult).not.toBeNaN();
    expect(secondResult).not.toBeNaN();
    expect(typeof firstResult).toEqual('number');
    expect(typeof secondResult).toEqual('number');
  });

  it('should return floats with two decimal places when I call it with a known mock', function() {

    const result = findClipping(mockLightnessLCD);
    const firstResult = parseFloat(result[0]);
    const secondResult = parseFloat(result[1]);
    const firstSplit = result[0].split('.');
    const secondSplit = result[1].split('.');


   expect(typeof firstResult).toEqual('number');
   expect(typeof secondResult).toEqual('number');
   expect(firstSplit[1].length).toEqual(2);
   expect(secondSplit[1].length).toEqual(2);
  });

});