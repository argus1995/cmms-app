const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
  next();
};

const errorHandler = (err, req, res, next) => {
  // prevents sending a 200 OK for an error response
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
