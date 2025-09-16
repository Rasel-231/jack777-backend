import mongoose from "mongoose";

import { Server } from "http";
import config from "./config";
import { errorLogger, logger } from "./common/CustomLogger/logger";
import app from "./app";









let server: Server
async function Database() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("Database connected is successfull")
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error("Failed to caonnected Database", err);
  }

  process.on('unhandledRejection', (err) => {
    if (server) {
      errorLogger.error(err);
      server.close(() => { errorLogger.error(err) })
      process.exit(1)
    }
    else {
      process.exit(1)
    }
  })
}

Database();


process.on('SIGTERM', (err) => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }

  process.exit(1)
})
