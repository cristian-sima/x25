// @flow

class SimulatedException {
  constructor (message, stack) {
    this.message = message;
    this.stack = stack;
    this.name = "SimulatedException";
  }
}

export default SimulatedException;
