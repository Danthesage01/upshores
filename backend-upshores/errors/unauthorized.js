import { StatusCodes } from "http-status-codes";
import CustomErrorAPI from "./custom-error.js";

class UnauthorizedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
