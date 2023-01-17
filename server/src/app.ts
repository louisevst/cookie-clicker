import { fastify, FastifyServerOptions } from 'fastify';
import { getGame, setGame } from './routes/game.route';
import { root } from './routes/root.route';
import { connect } from './database';

export default (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  app.addHook('onReady', async () => {
    await connect();
  });

  app.get('/', root);
  app.get('/game/:id', getGame);
  app.post('/game/:id', setGame);

  return app;
};
