const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');

// render create
exports.renderCreate = function(req, res) {
  return res.render('instructors/create');
};

// index
exports.index = function(req, res) {
  const DataShow = [];

  for (let index = 0; index < data.instructors.length; index++) {
    let nomeArr = data.instructors[index].name.split(' ');

    if (data.instructors[index].services.length >= 11) {
      DataShow.push({
        id: data.instructors[index].id,
        name: nomeArr[0],
        avatar_url: data.instructors[index].avatar_url,
        gender: data.instructors[index].gender,
        services: data.instructors[index].services.slice(0, 11).concat('...'),
        birth: data.instructors[index].birth,
        created_at: data.instructors[index].created_at,
      });
    } else {
      DataShow.push({
        id: data.instructors[index].id,
        name: nomeArr[0],
        avatar_url: data.instructors[index].avatar_url,
        gender: data.instructors[index].gender,
        services: data.instructors[index].services.slice(0, 11),
        birth: data.instructors[index].birth,
        created_at: data.instructors[index].created_at,
      });
    }
  }

  return res.render('instructors/index', { instructors: DataShow });
};

// show
exports.show = function(req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(instructor => {
    return id == instructor.id;
  });

  if (!foundInstructor) {
    return res.status(400).json({ error: 'Instructor not found!' });
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    created_at:
      new Date(foundInstructor.created_at).getUTCDate() +
      '/' +
      (new Date(foundInstructor.created_at).getUTCMonth() + 1) +
      '/' +
      new Date(foundInstructor.created_at).getUTCFullYear(),
  };

  return res.render('instructors/show', { instructor: instructor });
};

// create
exports.post = function(req, res) {
  const keys = Object.values(req.body);

  for (let index = 0; index < keys.length; index++) {
    if (keys[index] === '') {
      return res.status(400).json({ error: 'fill in all the fields!' });
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  services = services.split(',');

  services = services.map(arr => arr.trim());

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(Math.floor(Math.random() * 1000000000) + 1);

  data.instructors.push({
    id,
    name,
    birth,
    avatar_url,
    gender,
    services,
    created_at,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.status(500).json({ error: 'Write error!' });

    return res.redirect('/instructors');
  });

  // return res.send(req.body);
};

// edit
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(instructor => {
    return id == instructor.id;
  });

  if (!foundInstructor) {
    return res.status(400).json({ error: 'Instructor not found!' });
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render('instructors/edit', { instructor });
};

//put
exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function(
    instructor,
    foundIndex
  ) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) {
    return res.status(400).json({ error: 'Instructor not found!' });
  }

  let { services, name, avatar_url, gender, birth } = req.body;

  services = services.split(',');

  services = services.map(arr => arr.trim());

  const instructor = {
    id: Number(id),
    name,
    avatar_url,
    gender,
    services,
    birth: Date.parse(birth),
    created_at: foundInstructor.created_at,
  };

  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      return res.status(500).send('Write error!');
    }

    return res.redirect(`/instructors/${id}`);
  });
};

// delete
exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function(instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.status(500).json({ err: 'Write file error!' });

    return res.redirect('/instructors');
  });
};
