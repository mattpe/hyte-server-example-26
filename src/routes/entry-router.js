import express from 'express';
import {getEntries, getEntryById} from '../controllers/entry-controller.js';

const entryRouter = express.Router();

entryRouter.route('/').get(getEntries);

entryRouter.route('/:id').get(getEntryById);

export default entryRouter;
