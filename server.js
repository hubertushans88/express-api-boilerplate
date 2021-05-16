"use strict";

require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./src/config/logger');

const mongoOpt={
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


let server;


mongoose.connect(mongoUrl,mongoOpt).then(()=>{
    logger.info('Connected to MongoDB');
    server = app.listen(port,()=>{
        logger.info(`Listening to port ${port}`);
    });
});

const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
};
  
const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};
  
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
});