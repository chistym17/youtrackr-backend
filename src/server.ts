import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import playlistRoutes from './routes/playlist.routes';
import videoRoutes from './routes/video.routes';
import watchHistoryRoutes from './routes/watchHistory.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/playlists', playlistRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/watch-history', watchHistoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 