import express from 'express';

const routes = express.Router();
const instructors = require('./controllers/instructors');
const members = require('./controllers/members');

// redirect
routes.get('/', function(req, res) {
  return res.redirect('/instructors');
});
routes.get('/instructors', instructors.index);
routes.get('/instructors/create', instructors.renderCreate);
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete);
routes.post('/instructors', instructors.post);

routes.get('/members', members.index);
routes.get('/members/create', members.create);
routes.get('/members/:id', members.show);
routes.get('/members/:id/edit', members.edit);
routes.put('/members', members.put);
routes.delete('/members', members.delete);
routes.post('/members', members.post);

export default routes;
