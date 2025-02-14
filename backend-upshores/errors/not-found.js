import CustomErrorAPI from "./custom-error.js";

import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = "RequestNotFoundError";
  }
}

export default NotFoundError;
