import express from 'express';
import {body} from 'express-validator';
import {
  deleteEntry,
  getEntries,
  getEntryById,
  postEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(authenticateToken, body(), postEntry);

entryRouter
  .route('/:id')
  .get(getEntryById)
  .delete(authenticateToken, deleteEntry);

export default entryRouter;
