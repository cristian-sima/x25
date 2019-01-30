// @flow

class SimulatedException extends Error {
  name: "SimulatedException"

  constructor (message, stack) {
    super(message);

    this.message = message;
    this.stack = stack;
    this.name = message;
  }
}

export default SimulatedException;
