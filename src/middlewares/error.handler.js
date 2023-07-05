import { ValidationError } from 'sequelize';
import boom from '@hapi/boom';

export function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    status: statusCode,
    message: message,
    stack: err.stack,
  });
}

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({
      status: output.statusCode,
      message: output.payload.message,
    });
  }
  next(err);
}

export function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      stack: err.stack,
      errors: err.errors
    });
  }
  next(err);
}
