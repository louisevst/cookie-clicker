import { model, Schema } from 'mongoose';

interface IBonus {
  _id: string;
  store: IBonus[];
}

const bonusSchema = new Schema<IBonus>({
  _id: String,
  store: Array<IBonus>,
});

export const Bonus = model<IBonus>('Bonus', bonusSchema);
