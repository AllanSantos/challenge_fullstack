import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import 'dotenv/config';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não enviado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    req.userId = decoded._id;

    return next();

  } catch (err) {
    console.log(err)
    return res.status(401).json({ mensagem: 'Token invalido' });
  }
};