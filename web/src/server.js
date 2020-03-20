import express from 'express';
import nunjucks from 'nunjucks';

import routes from './routes';

const server = express();

server.use(express.static('public'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(3333, function() {
  console.log('server is running on port 3333');
});
