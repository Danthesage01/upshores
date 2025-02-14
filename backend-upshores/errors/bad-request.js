import CustomErrorAPI from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = "BadRequestError";
  }
}

export default BadRequestError;

// class BadRequestError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 400;
//     this.name = "BadRequestError";
//   }
// }

// export default BadRequestError;
