/* eslint-disable max-classes-per-file */
class CustomError<Message extends string, Stack extends string> extends Error {
  constructor (message: Message, stack: Stack) {
    super(message);
    this.message = message;
    this.name = message;
    this.stack = stack;
  }

}

type Message = string;
type Stack = string;

class SimulatedException extends CustomError<Message, Stack> {}

export default SimulatedException;
