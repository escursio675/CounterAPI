import express from 'express';

import { createCounter, listCounters, getCounter, incrementCounter, decrementCounter, resetCounter, deleteCounter} from "../controllers/counterController.js";

import { requireSiteAPIKey } from '../middleware/auth.js';

const router = express.Router();
router.use(requireSiteAPIKey );

router.get('/', listCounters);

router.post('/', createCounter);

router.get('/:name', getCounter);

router.patch('/:name/increment', incrementCounter);

router.patch('/:name/decrement', decrementCounter);

router.patch('/:name/reset', resetCounter);

router.delete('/:name', deleteCounter);

export default router;
