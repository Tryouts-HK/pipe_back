import express, { Express } from 'express';
import { DatabaseManager } from './database';
import { PipeConfig } from './Config/config';

const Pipe: Express = express()
const db = new DatabaseManager();




db.connectToMongoDB(PipeConfig.db.mongo.db1).then((client) => {
    Pipe.listen(PipeConfig.app.port, () => {
        console.log('Server is running on port 3000');
    });
});