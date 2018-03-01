'use strict';

const mongoose = require('mongoose');
// mongoose.Promise = global.Promise; // .finally won't work
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
const FileModel = require('./model/file.js');

// const mongoString = 'mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_COLLECTION_NAME;
const mongoString = 'mongodb://dpuru:enternow@ds251548.mlab.com:51548/target-test'; // MongoDB Url
// const mongoString = 'mongodb://dpuru:%24toneheng%23@ds143678.mlab.com:43678/target-aws';  MongoDB Url

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: {
    'Content-Type': 'text/plain'
  },
  body: message || 'Incorrect id'
});

exports.register = function(server, options, next) {
  const plugins = [];

  server.register(plugins, () => {
    server.route({
      method: 'GET',
      path: '/test',
      handler: function(request, reply) {
        reply('OK');
      }
    });

    server.route({
      method: 'GET',
      path: '/check',
      handler: function(request, reply) {

        return reply({message: 'hello from route boilerplate'});
      }
    });

    server.route({
      method: 'GET',
      path: '/files',
      handler: function(request, reply) {
        mongoose.connect(mongoString);
        let db = mongoose.connection;
        db.once('open', () => {
          FileModel.find({}).then((file) => {
            reply({statusCode: 200, body: file});
          }).catch((err) => {
            reply(createErrorResponse(err.statusCode, err.message));
          }).finally(() => {
            // Close db connection or node event loop won't exit , and lambda will timeout
            db.close();
          });
        });
      }
    });

    server.route({
      method: 'POST',
      path: '/files',
      handler: function(request, reply) {
        mongoose.connect(mongoString);
        let db = mongoose.connection;
        let file = {};
        const mongooseId = '_id';

        file = new FileModel({
          filename: request.payload.filename,
          upload_start: request.payload.upload_start || '',
          upload_end: request.payload.upload_end || '',
          md5sum: request.payload.md5sum,
          submission: request.payload.submission
        });

        db.once('open', () => {
          file.save().then(() => {
            reply({
              statusCode: 200,
              body: JSON.stringify({id: file[mongooseId]})
            });
          }).catch((err) => {
            reply(createErrorResponse(err.statusCode, err.message));
          }).finally(() => {
            db.close();
          });
        });
      }
    });

    return next();
  });
};

exports.register.attributes = {
  // pkg: {
  //   name: 'api',
  //   version: '1.0.0'
  // }
  name: 'api'
};
