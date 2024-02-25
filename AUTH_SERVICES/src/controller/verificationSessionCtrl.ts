import { Request, Response } from 'express';
import VerificationSessionUsecases from '../usecases/verificationSessionUsecases';

class VerificationSessionCtrl {
  static async verification(req: Request, res: Response) {
    const token = req.body.token;
    try {
      if (!token) {
        return res.status(400).json({ error: 'Token not provided' });
      }

      const decoded = await VerificationSessionUsecases.verification(token);
      if (decoded) {
        return res.status(200).json(true);
      } else {
        return res.status(401).json(false);
      }

    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message || 'Server Error' });
      } else {
        return res.status(500).json({ error: 'Server Error' });
      }
    }
  }

}

export default VerificationSessionCtrl;