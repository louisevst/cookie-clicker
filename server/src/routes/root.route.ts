import { RouteHandlerMethod } from 'fastify';

export const root: RouteHandlerMethod = (req, res) => {
  res.status(200).send({
    hello: 'world',
  });
};
