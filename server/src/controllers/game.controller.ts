import { Game } from '../database/models/game.model';

export const getGameController = async (id: string) => {
  const document = await Game.findById(id);

  if (!document) {
    throw new Error('User Not Found');
  }

  return document;
};
