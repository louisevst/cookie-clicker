import { RouteHandlerMethod } from 'fastify';
import { getGameController, setGameController } from '../controllers/game.controller';

export const getGame: RouteHandlerMethod = async (req, res) => {
  try {
    const document = await getGameController(req.params.id);

    res.status(200).send({
      id: document._id,
      bank: document.bank,
      clickPerSeconds: document.clickPerSeconds,
      hasBoost: document.hasBoost,
      name: document.name,
      score: document.score,
    });
  } catch (e) {
    res.status(404).send({
      error: 404,
      message: e.message,
    });
  }
};

export const setGame: RouteHandlerMethod = async (req, res) => {
  const data = {
    bank: req.body.bank,
    clickPerSeconds: req.body.clickPerSeconds,
    hasBoost: req.body.hasBoost,
    name: req.body.name,
    score: req.body.score,
  };

  await setGameController(req.params.id, data);

  return res.status(200).send(data);
};
