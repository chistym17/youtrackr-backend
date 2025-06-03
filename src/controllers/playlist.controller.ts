import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createPlaylist = async (req: Request, res: Response) => {
  const { name, description, isPublic } = req.body;
  const userId = req.headers['user-id'] as string;

  try {
    const playlist = await prisma.playlist.create({
      data: { name, description, isPublic, userId }
    });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create playlist' });
  }
};

export const getPlaylists = async (req: Request, res: Response) => {
  const userId = req.headers['user-id'] as string;

  try {
    const playlists = await prisma.playlist.findMany({
      where: { userId },
      include: { videos: true }
    });
    res.json(playlists);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch playlists' });
  }
};


export const getPlaylistsbyid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.headers['user-id'] as string;

  try {
    const playlists = await prisma.playlist.findUnique({
      where: { id, userId },
      include: { videos: true }
    });
    res.json(playlists);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch playlists' });
  }
};

export const updatePlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, isPublic } = req.body;
  const userId = req.headers['user-id'] as string;

  try {
    const playlist = await prisma.playlist.update({
      where: { id, userId },
      data: { name, description, isPublic }
    });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update playlist' });
  }
};

export const deletePlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.headers['user-id'] as string;

  try {
    await prisma.playlist.delete({
      where: { id, userId }
    });
    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete playlist' });
  }
};

export const addVideoToPlaylist = async (req: Request, res: Response) => {
  const { playlistId, videoId } = req.params;
  const userId = req.headers['user-id'] as string;

  try {
    const playlist = await prisma.playlist.update({
      where: { id: playlistId, userId },
      data: { videos: { connect: { id: videoId } } }
    });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add video to playlist' });
  }
};

export const removeVideoFromPlaylist = async (req: Request, res: Response) => {
  const { playlistId, videoId } = req.params;
  const userId = req.headers['user-id'] as string;

  try {
    const playlist = await prisma.playlist.update({
      where: { id: playlistId, userId },
      data: { videos: { disconnect: { id: videoId } } }
    });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove video from playlist' });
  }
}; 