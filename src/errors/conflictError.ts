import { constants } from 'http2';

// 409
class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}

export default ConflictError;
