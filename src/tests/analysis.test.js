import {
  getNthLength
} from '../scripts/Data.analysis';

describe("nth Length function", function() {
  const arr = [1,2,3,4];
  const fracN = 0.33333;
  // determine what to test for
  it("should get 3/4 length", function() {
    expect(Number.isInteger(getNthLength(arr, fracN))).toBe(true);
  });

});
