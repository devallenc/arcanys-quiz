import { hash, compare } from 'bcrypt';

export interface IBcryptService {
  hashPassword (password: string) : Promise<string>
  comparePassword (password: string, hashedPassword: string) : Promise<boolean>
}

export default class BcryptService {
  private saltRound: number = 10;
  constructor (saltRound?: number) {
    if (saltRound) {
      this.saltRound = saltRound;
    }
  }

  public async hashPassword (password: string) {
    return hash(password, this.saltRound);
  }

  public async comparePassword (password: string, hashPassword: string) {
    return compare(password, hashPassword);
  }
}