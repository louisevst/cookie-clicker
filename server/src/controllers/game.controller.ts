import { Game } from '../database/models/game.model';

export const getGameController = async (id: string) => {
  const document = await Game.findById(id);

  if (!document) {
    throw new Error('Game Not Found');
  }

  return document;
};

export const setGameController = async (id: string, data: any) => {
  let document = await Game.findByIdAndUpdate(id, data, { new: true });

  if (!document) {
    document = await Game.create({
      _id: id,
      ...data,
    });
  }

  return document;
};
