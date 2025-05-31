import { Router } from 'express';
import {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo
} from '../controllers/video.controller';

const router = Router();

router.post('/', createVideo);
router.get('/', getVideos);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router; 