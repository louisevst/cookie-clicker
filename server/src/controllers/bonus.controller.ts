import { FastifyRequest } from 'fastify';
import { Bonus } from '../database/models/bonus.model';

export const getBonusController = async (id: string) => {
  const document = await Bonus.findById(id);

  if (!document) {
    throw new Error('Bonus Not Found');
  }

  return document;
};

export const setBonusController = async (req: FastifyRequest) => {
  let document = await Bonus.findByIdAndUpdate(
    req.params.id,
    {
      store: req.body.store,
    },
    { new: true },
  );

  if (!document) {
    document = await Bonus.create({
      _id: req.params.id,
      store: req.body.store,
    });
  }

  return document;
};
