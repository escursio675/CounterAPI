import express from 'express';

import { requireAdminAPIKey } from '../middleware/auth.js';

import { createSite, listSites, rotateAPIKey, deleteSite } from '../controllers/siteController.js';

const router = express.Router();

router.use(requireAdminAPIKey);

router.get('/', listSites);

router.post('/', createSite);

router.patch('/:id/rotate-key', rotateAPIKey);

router.delete('/:id', deleteSite);

export default router;
