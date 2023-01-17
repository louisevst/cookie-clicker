import { beforeAll, afterAll } from 'vitest';
import app from '../app';

const fastify = app();

beforeAll(async () => {
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});

export default fastify;
