import { Request, Response } from 'express';
import * as yup from 'yup';
import CreateSessionUsecases from '../usecases/createSessionUsecases';

class CreateSessionCtrl {
  static async createSession(req: Request, res: Response) {
    try {
        const token = await CreateSessionUsecases.createSession(req.body)
        res.json(token)
    } catch (error: any) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
            res.status(400).json({ error: error.message });
        } else if (error.status && typeof error.status === 'number' && error.message) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Create Session Server Error' });
        }
    }
  }
}

export default CreateSessionCtrl;