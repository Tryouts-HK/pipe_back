import { createConnection } from 'mongoose';

export class DatabaseManager {
    public async connectToMongoDB(uri: string) {
        try {
            const client = createConnection(uri);
            console.log('Connected to MongoDB at ' + uri);
            return client;
        } catch (error) {
            console.error('Error connecting to MongoDB');
        }
    }
}