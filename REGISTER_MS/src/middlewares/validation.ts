import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const validations = (schema: yup.AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body)
    next()
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const { message, name } = error
      res.status(400).json({ data: { message, name, status: 400 } })
      console.error(error.message)
    }
  }
}

export default validations
