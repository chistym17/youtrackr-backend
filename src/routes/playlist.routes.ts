import { Router } from 'express';
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getPlaylistsbyid
} from '../controllers/playlist.controller';

const router = Router();

router.post('/', createPlaylist);
router.get('/', getPlaylists);
router.get('/:id', getPlaylistsbyid);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.post('/:playlistId/videos/:videoId', addVideoToPlaylist);
router.delete('/:playlistId/videos/:videoId', removeVideoFromPlaylist);

export default router; 