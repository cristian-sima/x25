/* eslint-disable max-classes-per-file */
class CustomError extends Error {
  constructor (theError : any) {
    super(theError);
    this.message = theError.message;
    this.name = theError.name;
    this.stack = theError.stack;
  }

}


class SimulatedException extends CustomError {}

export default SimulatedException;
