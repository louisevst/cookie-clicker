import { RouteHandlerMethod } from 'fastify';
import { getBonusController, setBonusController } from '../controllers/bonus.controller';

export const getBonus: RouteHandlerMethod = async (req, res) => {
  try {
    const document = await getBonusController(req.params.id);

    res.status(200).send({
      id: document._id,
      store: document.store,
    });
  } catch (e) {
    res.status(404).send({
      error: 404,
      message: e.message,
    });
  }
};

export const setBonus: RouteHandlerMethod = async (req, res) => {
  await setBonusController(req);

  return res.status(200).send({
    id: req.params.id,
    store: req.body.store,
  });
};
