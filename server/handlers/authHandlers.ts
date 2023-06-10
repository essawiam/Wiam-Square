import crypto from 'crypto';

import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400);
  }
  const existing = (await db.getUserByName(login)) || (await db.getUserByEmail(login));
  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }
  return res.status(200).send({
    email: existing.email,
    firstName: existing.firstName,
    lastName: existing.lastName,
    userName: existing.userName,
    id: existing.id,
  });
};

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { email, userName, password, lastName, firstName } = req.body;
  if (!email || !userName || !password || !lastName || !firstName) {
    return res.status(400).send('All fields are required');
  }

  const existing = (await db.getUserByName(userName)) || (await db.getUserByEmail(email));

  if (existing) {
    return res.status(403).send('User already exists');
  }
  const user: User = {
    id: crypto.randomUUID(),
    email: email,
    userName: userName,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };
  await db.createUser(user);
  await res.sendStatus(200);
};
