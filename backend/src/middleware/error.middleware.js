export const errorHandler = (err, req, res, next) => {
  console.error("Express Global Error:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    success: false,
    message,
  });
};
