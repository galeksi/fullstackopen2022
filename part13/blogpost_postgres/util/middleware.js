const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "Error") {
    return response.status(400).send({
      error: error.message,
    });
  }
  if (error.name === "SequelizeValidationError") {
    return response.status(400).send({
      "database validation error": error.message,
    });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(400).send({
      "user validation error": error.message,
    });
  }

  next(error);
};

module.exports = { errorHandler };
