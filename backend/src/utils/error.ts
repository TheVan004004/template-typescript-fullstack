export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = typeof statusCode === 'number' ? statusCode : 500;
    this.name = 'HttpError';
    Error.captureStackTrace(this, this.constructor);
    // Error.captureStackTrace(...): cho Node.js biết bắt đầu stack trace từ vị trí này,
    // và loại bỏ constructor khỏi stack trace để log lỗi ngắn gọn hơn.
  }
}
