import {
  getNthLength,
} from '../scripts/Data.analysis';

// don't need this test, this function's fairly simple
describe('A function that gets n% of length of an array', function() {
  const arr = [1,2,3,4];
  const fracN = 0.39761155133;

  it('should return an integer', function() {
    expect(Number.isInteger(getNthLength(arr, fracN))).toBe(true);
  });

});

describe('A function for finding the most frequent colors', function() {



  it('should return an array of length 6', function() {
    expect(array.length).toEqual(6);
  });

  it('should be trying to merge similar colors', function() {
    expect().toBe();
  });

  it('should be trying to remove entries', function() {
    expect().toBe();
  });

});

describe('A function for finding clipping', function() {


  it('should return an array of length 2', function() {
    expect(array.length).toEqual(2);
  });

  it('should return floats with two decimal places', function() {
    /*
    Number.toString();
    String.split('.');
    String.length of the other half(should equal 2)
    */
    expect().toBe()
  })
});