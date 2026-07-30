/**
 * Uniform API Response Utility
 */

export function sendSuccess(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, message = 'An error occurred', statusCode = 400, code = undefined, errors = undefined) {
  return res.status(statusCode).json({
    success: false,
    code,
    message,
    errors,
  });
}
