import { model, Schema } from 'mongoose';

interface IGame {
  _id: string;
  state: string;
}

const gameSchema = new Schema<IGame>({
  _id: String,
  state: String,
});

export const Game = model<IGame>('Game', gameSchema);
