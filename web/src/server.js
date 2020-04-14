import express from 'express';
import nunjucks from 'nunjucks';
import methodOverride from 'method-override';

import routes from './routes';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'));
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
