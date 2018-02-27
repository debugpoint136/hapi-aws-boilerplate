'use strict';

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
      method : 'GET',
      path   : '/check',
      handler: function (request, reply) {

          return reply({ message: 'hello from route boilerplate'});
      }
    });

    return next();
  });

};

exports.register.attributes = {
  pkg: {
    name: 'api',
    version: '1.0.0'
  }
};
