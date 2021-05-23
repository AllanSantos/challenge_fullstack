import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
  async store(req, res) {

    const schema = Yup.object().shape({

      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      departamento: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: 'Validação Falhou' });
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({ messagem: 'User já existente com esse email.' });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();