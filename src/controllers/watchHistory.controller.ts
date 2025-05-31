import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const updateWatchProgress = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const { progress, lastPosition, completed } = req.body;
  const userId = req.headers['user-id'] as string;

  try {
    const watchHistory = await prisma.watchHistory.upsert({
      where: { userId_videoId: { userId, videoId } },
      update: { progress, lastPosition, completed },
      create: { videoId, userId, progress, lastPosition, completed }
    });
    res.json(watchHistory);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update watch progress' });
  }
};

export const getWatchHistory = async (req: Request, res: Response) => {
  const userId = req.headers['user-id'] as string;

  try {
    const history = await prisma.watchHistory.findMany({
      where: { userId },
      include: { video: true }
    });
    res.json(history);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch watch history' });
  }
};

export const deleteWatchHistory = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const userId = req.headers['user-id'] as string;

  try {
    await prisma.watchHistory.delete({
      where: { userId_videoId: { userId, videoId } }
    });
    res.json({ message: 'Watch history deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete watch history' });
  }
}; 