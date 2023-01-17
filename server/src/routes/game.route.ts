import { RouteHandlerMethod } from 'fastify';
import { Game } from '../database/models/game.model';
import { getGameController } from '../controllers/game.controller';

export const getGame: RouteHandlerMethod = async (req, res) => {
  try {
    const document = await getGameController(req.params.id);

    res.status(200).send({
      id: document._id,
      state: JSON.parse(document.state),
    });
  } catch (e) {
    res.status(404).send({
      error: 404,
      message: e.message,
    });
  }
};

export const setGame: RouteHandlerMethod = async (req, res) => {
  let document = await Game.findByIdAndUpdate(
    req.params.id,
    {
      state: JSON.stringify(req.body),
    },
    { new: true },
  );

  if (!document) {
    document = await Game.create({
      _id: req.params.id,
      state: JSON.stringify(req.body),
    });
  }

  return res.status(200).send({
    id: req.params.id,
    state: JSON.parse(document.state),
  });
};
