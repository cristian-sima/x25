/* eslint-disable max-classes-per-file */
class CustomError<Message extends string, Stack extends string> extends Error {
  constructor (theError : any) {
    super(theError);
    this.message = theError.message;
    this.name = theError.name;
    this.stack = theError.stack;
  }

}

type Message = string;
type Stack = string;

class SimulatedException extends CustomError<Message, Stack> {}

export default SimulatedException;
