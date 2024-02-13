import { Request, Response } from 'express';
import * as yup from 'yup';

class SessionCtrl {
  async create(req: Request, res: Response) {
    try {
      const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || 'Server Error' });
      } else {
        res.status(500).json({ error: 'Server Error' });
      }
    }
  }
  async verification(req: Request, res: Response) {
    try {
      const schema = yup.object({
        token: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || 'Server Error' });
      } else {
        res.status(500).json({ error: 'Server Error' });
      }
    }
  }

}

export default SessionCtrl;