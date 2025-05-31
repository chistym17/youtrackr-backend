import { Router } from 'express';
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist
} from '../controllers/playlist.controller';

const router = Router();

router.post('/', createPlaylist);
router.get('/', getPlaylists);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.post('/:playlistId/videos/:videoId', addVideoToPlaylist);
router.delete('/:playlistId/videos/:videoId', removeVideoFromPlaylist);

export default router; 