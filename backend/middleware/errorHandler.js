function errorHandler(err, req, res, next) {
  // Log server-side error for debugging
  console.error(err && err.stack ? err.stack : err);

  const status = err && err.statusCode ? err.statusCode : 500;
  const message = err && err.message ? err.message : 'Internal Server Error';

  res.status(status).json({ message });
}

module.exports = { errorHandler };
