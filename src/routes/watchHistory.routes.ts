import { Router } from 'express';
import {
  updateWatchProgress,
  getWatchHistory,
  deleteWatchHistory
} from '../controllers/watchHistory.controller';

const router = Router();

router.put('/:videoId', updateWatchProgress);
router.get('/', getWatchHistory);
router.delete('/:videoId', deleteWatchHistory);

export default router; 