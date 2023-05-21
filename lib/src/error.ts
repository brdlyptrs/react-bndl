interface IProps {
    message: string
    stack? : string
}

export class BundleError extends Error {

  constructor({ message, stack }:IProps) {
    super(message);
    this.message = message;
    this.stack   = stack;
  }

}