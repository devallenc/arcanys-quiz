import * as jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY';

export interface ITokenService {
  generate (data: any, minutes: number) : { token: string, expiresIn: number }
  verify (token: string) : Promise<unknown>
}

export default class TokenService {
  generate(data: any, minutes: number = 5) {
    const token = jwt.sign(
      data, 
      SECRET_KEY, {
        expiresIn: Math.floor(60 * minutes)
      }
    )
    return { token, expiresIn: (minutes * 1000 + Date.now()) }
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, {}, (error, decoded) => {
        if (error) {
          reject(error);
        }
        resolve(decoded);
      })
    })
  }
}