import { model, Schema } from 'mongoose';

interface IGame {
  _id: string;
  bank: number;
  hasBoost: boolean;
  score: number;
  clickPerSeconds: number;
  name: string;
}

const gameSchema = new Schema<IGame>({
  _id: String,
  bank: Number,
  hasBoost: Boolean,
  score: Number,
  clickPerSeconds: Number,
  name: String,
});

export const Game = model<IGame>('Game', gameSchema);
