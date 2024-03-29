import { IException } from '../models/UserTypes'

class GenericExeption extends Error implements IException {
  public status: number

  constructor(message: string, status: number, name: string) {
    super(message)
    this.name = name
    this.status = status || 500
    this.consoleError()
  }

  consoleError() {
    console.error(this)
  }
}

export class ServerErrorException extends GenericExeption {
  constructor() {
    super('Internal server error', 500, 'ServerErrorException')
  }
}

export class UserException extends GenericExeption {
  constructor(message: string, status: number, name: string) {
    super(message, status, name)
  }
}

export class UserAlreadyExistsException extends UserException {
  constructor(message?: string) {
    super(message ?? 'User already exists', 409, 'UserAlreadyExistsException')
  }
}

export class UserNotFoundException extends UserException {
  constructor() {
    super('User not found', 404, 'UserNotFoundException')
  }
}

export class AddressNotFoundException extends UserException {
  constructor() {
    super('Address not found', 404, 'AddressNotFoundException')
  }
}