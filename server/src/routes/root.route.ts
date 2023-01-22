import { RouteHandlerMethod } from 'fastify';

export const rootRoute: RouteHandlerMethod = (req, res) => {
  res.status(200).send({
    hello: 'world',
  });
};
