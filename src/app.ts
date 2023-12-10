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
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { name, version, description } from '@/../package.json';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes, { Routes } from './routes';

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

    this.initializeErrorHandling();
    logger.info('Error handling initialized');

    this.initializeSwagger();
    logger.info('Swagger initialized');

    this.initializeRoutes([routes]); // Fix: Wrap routes in an array
    logger.info('Routes initialized');
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

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: name,
          version: version,
          description: description,
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
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
