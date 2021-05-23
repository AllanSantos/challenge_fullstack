import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({mensagem: 'Validação Falhou'});
    }

    const { email, password} = req.body;

    const user = await User.findOne({ email });
     if (!user) {
       return res.status(401).json({mensagem: 'Usuário e/ou senha inválidos'});
     }

     if (!(await bcrypt.compare(password, user.password))) {
       return res.status(401).json({mensagem: 'Usuário e/ou senha inválidos'});
     }

     delete user._doc.password;

     const {_id} = user;

     return res.json({
       user,
       token: jwt.sign({ _id }, process.env.APP_SECRET, {
        expiresIn: process.env.EXPIRE_IN,
       }),
     });
  }
}

export default new SessionController();