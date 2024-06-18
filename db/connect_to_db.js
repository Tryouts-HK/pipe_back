import { connect } from 'mongoose';

const dbConnection = (url) => connect(url);

export default dbConnection;