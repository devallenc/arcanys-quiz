import { Sequelize } from 'sequelize';

export const SequelizeConnection = new Sequelize(
  process.env.MYSQLDB_DATABASE || '',
  process.env.MYSQLDB_USER || '', 
  process.env.MYSQLDB_ROOT_PASSWORD || '',  
  {
    host: "mysqldb",
    dialect: 'mysql',
    port: 3306,
  }
);

export type ISequelize = typeof SequelizeConnection;
