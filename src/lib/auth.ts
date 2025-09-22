import jwt from 'jsonwebtoken';

export function extractToken(req: Request): string {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) throw new Error('No token');
  return authHeader.replace('Bearer ', '');
}

export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}