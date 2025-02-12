import { StatusCodes } from "http-status-codes";
import CustomErrorAPI from "./custom-error.js";

class UnAuthenticatedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export default UnAuthenticatedError;
