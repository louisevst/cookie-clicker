import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export const authRoute = async (
  req: FastifyRequest,
  res: FastifyReply,
  app: FastifyInstance,
) => {
  if (!req.body) {
    return res.status(400).send();
  }

  const token = app.jwt.sign({
    payload: req.body,
  });

  return res.send(token);
};
