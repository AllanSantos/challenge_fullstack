import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import moment from 'moment'
import Client from '../models/Client';

class ClientController {
  async store(req, res) {

    const schema = Yup.object().shape({

      name: Yup.string().required(),
      email: Yup.string().email().required(),
      financialBalance: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ mensagem: 'Validação Falhou' });
    }
    console.log(moment(new Date()).format("DD/MM/YYYY"))
    const clientExists = await Client.findOne({ email: req.body.email });

    if (clientExists) {
      return res.status(400).json({ messagem: 'Cliente já existente com esse email.' });
    }

    req.body.clientSince = moment(new Date()).format("DD/MM/YYYY")

    const client = await Client.create(req.body);

    return res.json(client);
  }

  async index(req, res) {
    const client = await Client.find({ financialBalance: {$lt: 0} }, {name: 1, email: 1, financialBalance: 1, clientSince: 1}).exec();

    return res.json(client);
  }
}

export default new ClientController();