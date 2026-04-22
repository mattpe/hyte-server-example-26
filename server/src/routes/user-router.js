import express from 'express';
import {body} from 'express-validator';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handlers.js';

// käytetään kubios auth controlleria kirjautumiseen vanhan user controllerin sijasta
import {
  getUsers,
  postUser,
} from '../controllers/user-controller.js';
import {postLogin, getMe} from '../controllers/kubios-auth-controller.js';

const userRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */


// Users resource endpoints
userRouter
  .route('/')
  // GET all users
  .get(authenticateToken, getUsers)
  /**
   * @api {post} /users Create user
   * @apiVersion 1.0.0
   * @apiName PostUser
   * @apiGroup User
   * @apiPermission all
   *
   * @apiDescription Create a new user.
   *
   * @apiBody {String} username Username (Kubios) of the user, 3-20 characters, alphanumeric only.
   * @apiBody {String} password Password (Kubios) of the user, 8-100 characters.
   * @apiBody {String} email Email address of the user, must be valid email format.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "johnd",
   *      "password": "examplepass",
   *      "email": "johnd@example.com"
   *    }
   * @apiSuccess {Number} user_id Unique ID of the created user.
   */
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}),
    body('email').trim().isEmail(),
    validationErrorHandler,
    postUser,
  );

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiBody {String} username Username (Kubios) of the user.
 * @apiBody {String} password Password (Kubios) of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "johnd@example.com",
 *      "password": "examplepass"
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      TODO: check and fix kubios login response format here!!
 *      "message": "Logged in successfully",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
 *                XNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20
 *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
 *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
 *      "user": {
 *        "user_id": 21,
 *        "username": "johnd",
 *        "email": "johnd@example.com",
 *        "user_level": "regular"
 *      }
 *    }
 *
 * @apiUse UnauthorizedError
 */
userRouter.post('/login', postLogin);

// Get user info based on token
userRouter.get('/me', authenticateToken, getMe);

// TODO: get user by id
// app.get('/api/users/:id');
// TODO: put user by id
// TODO: delete user by id

export default userRouter;
