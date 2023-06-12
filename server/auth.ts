import jwt from 'jsonwebtoken';

import { JwtObject } from './types';

export function signJwt(obj: JwtObject): string {
  return jwt.sign(obj, getJwtSecret(), { expiresIn: '15d' });
}

export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log('Missing Jwt secret');
    process.exit(1);
  }
  return secret;
}
