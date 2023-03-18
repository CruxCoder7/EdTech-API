import express from 'express'
import Database from './loaders/v1/database';
import Env from './loaders/v1/env';
import Logger from './universe/v1/logger';
import FrameworkLoader from './loaders/v1/framework';

const server = async (): Promise<express.Application> => {
    const app = express();
    // Loaders
    Env.Loader()
    Logger.Loader()
    await Database.Loader()

    FrameworkLoader(app)
    //Routes

    return app;
}

export default server;