
import { Router } from 'express';
import { createPollHandler, voteHandler, getPollHandler } from '../controllers/pollController';

const router = Router();

router.post('/polls', createPollHandler);
router.post('/polls/:id/vote', voteHandler);
router.get('/polls/:id', getPollHandler);

export default router;
                