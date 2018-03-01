/**
 * uncomment this for local testing
 * when sls offline doesn't work
 */

// const Hapi = require('hapi');
//
// const server = new Hapi.Server({
//   connections: {
//     routes: {
//       cors: true
//     }
//   }
// });
// server.connection({port: 3000});
//
// server.register([
//  {
//     register: require('./api')
//   }
// ], error => {
//   if (error) {
//     console.log('Error: ', error);
//   } else {
//
//     server.route({
//       method: 'GET',
//       path: '/',
//       handler: function(request, reply) {
//         reply('Hello!')
//       }
//     });
//
//     server.start(function() {
//       console.log('Server running at:', server.info.uri);
//     });
//   }
// })
