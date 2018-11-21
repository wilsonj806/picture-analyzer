# Things learned

## About

This is a list of things learned throughout the project. Every entry is liable to change as knowledge is updated or gained.

## List

- Check to make sure your class names aren't being used by another prototype
  - i.e ImageData is already taken
  - see commit d790ce7
- Prefer using declared variables in a for loop over an object property like below:
  ```js
  // bad
  for (let i = 0; i < exampleArr.length; i += 1){
    // code
  }

  // good
  const l = exampleArr.length;
  for (let i =0; i < l; i += 1){
    //code
  }
  ```
  - setting it as a variable instead means the loop doesn't have to look up the property for every iteration
- Prefer keeping module entrypoints vague
  ```js
  // bad
  class Engine{
    constructor(power, cc){
    this.power = power;
    this.cc = cc;
    }

    startEngine() {
      // code
    }
  }
  const v8 = new Engine;
  class Vehicle{
    constructor(make, model, color){
      this.make;
      this.model;
      this.color;
    }

    startVehicle() {
      v8.startEngine();
    }
  }

  // good, or at least better
  class Engine{
    constructor(power, cc){
    this.power = power;
    this.cc = cc;
    }

    startEngine() {
      // code
    }
  }
  class Vehicle{
    constructor(make, model, color){
      this.make;
      this.model;
      this.color;
    }

    startVehicle(Engine) {
      Engine.startEngine();
    }
  }
  ```
  - keeping entrypoints vague makes the module reusuable/ less brittle
  - its also clearer that Engine is an external module