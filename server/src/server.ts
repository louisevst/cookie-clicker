import app from './app';

export const fastify = app();

if (import.meta.env.PROD) {
  try {
    const PORT = 5555;
    fastify.listen({ port: PORT });
    console.log('Listing on port', PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
