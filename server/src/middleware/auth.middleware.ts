import { RouteHandlerMethod } from 'fastify';

export const authMiddleware: RouteHandlerMethod = async (req, res) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    return res.redirect('/');
  }
};
