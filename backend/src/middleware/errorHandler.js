import { sendError } from '../utils/response.js';

export function errorHandler(err, req, res, next) {
  console.error('Unhandled Application Error:', err);
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error occurred.';
  return sendError(res, message, statusCode, 'INTERNAL_SERVER_ERROR');
}
