const config = {
  DATABASE_URL:
    process.env.NODE_ENV === 'development'
      ? process.env.DATABASE_URL_TEST
      : process.env.DATABASE_URL,
};

export default config;
