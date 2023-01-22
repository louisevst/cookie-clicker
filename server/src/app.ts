import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { fastify, FastifyServerOptions } from 'fastify';
import { connect } from './database';
import { authRoute } from './routes/auth.route';
import { rootRoute } from './routes/root.route';
import { getGame, setGame } from './routes/game.route';
import { getBonus, setBonus } from './routes/bonus.route';
import { authMiddleware } from './middleware/auth.middleware';

export default (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: '*',
  });

  app.register(jwt, {
    secret: 'becode',
  });

  app.addHook('onReady', async () => {
    await connect();
  });

  app.get('/', rootRoute);
  app.post('/auth', (req, res) => authRoute(req, res, app));

  app.register((app, opts, next) => {
    app.addHook('onRequest', authMiddleware);

    app.get('/game/:id', getGame);
    app.post('/game/:id', setGame);
    app.get('/bonus/:id', getBonus);
    app.post('/bonus/:id', setBonus);

    next();
  });

  return app;
};
