const configs = {
  development: {
    server: {
      host: 'localhost',
      port: 3000
    }
  },
  test: {
    server: {
      host: 'localhost',
      port: 3000
    }
  },
  production: {
    server: {
      host: 'localhost',
      port: 3000
    }
  },
};
type configKeys = keyof typeof configs;

const NODE_EVN = process.env.NODE_EVN as configKeys || 'development';

export default configs[NODE_EVN];