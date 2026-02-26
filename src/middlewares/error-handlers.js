import {validationResult} from 'express-validator';

/**
 * Middleware for checking all input validation errors
 * @param {*} req http request object
 * @param {*} res http response object
 * @param {*} next function for calling next function in middleware chain
 */
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  //console.log('middleware validation errors', errors);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({message: 'invalid input data', errors: errors.array()});
  }
  next();
};

export {validationErrorHandler};
