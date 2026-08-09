import { Server } from 'http';
import mongoose from 'mongoose';

import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log('MongoDB connected successfully');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);

  process.exit(1);
});