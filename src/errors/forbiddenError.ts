import { constants } from 'http2';

// 403
class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}

export default ForbiddenError;
