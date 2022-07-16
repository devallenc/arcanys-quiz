import { SequelizeConnection } from './sequelize';

export class Database {
  public async connect() {
    try {
      const result = await SequelizeConnection.sync();
      console.log("Database successfully connected", result.models);
    } catch(error) {
      console.log("Error connecting on DB", error);
    }
  }

  public close() {
    return SequelizeConnection.close()
  }
}