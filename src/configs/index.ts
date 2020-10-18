import databaseConfig from './database.json';
import path from 'path';

interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
  timezone: string;
}

const configs = {
  development: {
    server: {
      host: 'localhost',
      port: 3000
    },
    database: databaseConfig.development as IDatabaseConfig,
    jwt: {
      privateKey: 'ideal'
    },
  },
  test: {
    server: {
      host: 'localhost',
      port: 3000
    },
    database: databaseConfig.development as IDatabaseConfig,
    jwt: {
      privateKey: 'ideal'
    },
  },
  production: {
    server: {
      host: 'localhost',
      port: 3000
    },
    database: databaseConfig.development as IDatabaseConfig,
    jwt: {
      privateKey: 'ideal'
    },
  },
};
type configKeys = keyof typeof configs;

const NODE_EVN = process.env.NODE_EVN as configKeys || 'development';

export default configs[NODE_EVN];