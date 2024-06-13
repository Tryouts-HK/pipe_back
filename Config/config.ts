export const PipeConfig = Object.freeze({
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        mongo: {
            db1: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
        }
    }
})