import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createVideo = async (req: Request, res: Response) => {
  const { youtubeId, title, thumbnail, duration } = req.body;
  const userId = req.headers['user-id'] as string;

  try {
    const video = await prisma.video.create({
      data: { youtubeId, title, thumbnail, duration, userId }
    });
    res.json(video);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create video' });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  const userId = req.headers['user-id'] as string;

  try {
    const videos = await prisma.video.findMany({
      where: { userId },
      include: { playlists: true }
    });
    res.json(videos);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch videos' });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, thumbnail, duration } = req.body;
  const userId = req.headers['user-id'] as string;

  try {
    const video = await prisma.video.update({
      where: { id, userId },
      data: { title, thumbnail, duration }
    });
    res.json(video);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update video' });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.headers['user-id'] as string;

  try {
    await prisma.video.delete({
      where: { id, userId }
    });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete video' });
  }
}; 