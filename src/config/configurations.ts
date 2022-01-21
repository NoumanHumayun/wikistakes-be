const fs = require('fs');
const ca = fs.readFileSync('./ca-certificate.crt').toString();

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  serverUrl: process.env.SERVER_URL,
  appUrl: process.env.APP_URL,
  secret: process.env.JWT_SECRET,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 25060,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_typeorm',
    migrationsRun: true,
    ssl: {
      ca: ca
    },
    synchronize: false
  },
  aws: {
    endpoint: process.env.S3_URL,
    bucket: process.env.BUCKET,
    region: process.env.REGION,
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
  }
});
