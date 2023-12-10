import 'reflect-metadata';
import express from 'express';
import { logger, stream } from '@utils/logger';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import { connect } from '@database';

class App {
  public app: express.Application;
  public port: number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = parseInt(PORT) || 3000;
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
    logger.info('Middlewares initialized');
    this.connectToDatabase();
    logger.info('Database connected');
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
  }

  private async connectToDatabase() {
    await connect();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
}

export default App;
