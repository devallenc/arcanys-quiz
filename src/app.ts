import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { MainRoute } from './configs/main-routes'
import { Database }  from './configs/database'

export default class App {
  public app: Application
  public db: Database
  private port: number = 3000
  constructor() {
    this.app = express()
    if (process.env.PORT) {
      this.port = parseInt(process.env.PORT as string, 2)
    }
    this.db = new Database();
  }
  /**
   * expose the server port.
   */
  public listen(port: number = this.port): void {
    this.db.connect();
    this.loadMiddlewares()
    this.app.listen(port, () => {
      console.log(`Listening to port ${port}`)
    })
  }
  /**
   * load middlewares
   */
  private async loadMiddlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(new MainRoute().expose())
  }
}
