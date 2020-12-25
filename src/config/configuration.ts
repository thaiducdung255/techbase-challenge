export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
    options: {
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
});
