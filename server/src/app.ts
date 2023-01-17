import cors from '@fastify/cors';
import { fastify, FastifyServerOptions } from 'fastify';
import { getGame, setGame } from './routes/game.route';
import { root } from './routes/root.route';
import { connect } from './database';
import { getBonus, setBonus } from './routes/bonus.route';

export default (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  app.addHook('onReady', async () => {
    await connect();
  });

  app.register(cors, {
    origin: '*',
  });

  app.get('/', root);
  app.get('/game/:id', getGame);
  app.post('/game/:id', setGame);
  app.get('/bonus/:id', getBonus);
  app.post('/bonus/:id', setBonus);

  return app;
};
