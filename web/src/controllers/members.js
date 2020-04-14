const fs = require('fs');
const data = require('../../data.json');
const { datePt, date, birthFormat, bloodFormat } = require('../utils');

// render index
exports.renderIndexMembers = function(req, res) {
  return res.render('members/index');
};

exports.index = function(req, res) {
  const DataShow = [];

  for (let index = 0; index < data.members.length; index++) {
    let nomeArr = data.members[index].name.split(' ');

    DataShow.push({
      id: data.members[index].id,
      name: nomeArr[0],
      avatar_url: data.members[index].avatar_url,
      weight: data.members[index].weight,
      height: data.members[index].height,
      email: data.members[index].email,
    });
  }

  return res.render('members/index', { members: DataShow });
};

// show
exports.show = function(req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(member => {
    return id == member.id;
  });

  if (!foundMember) {
    return res.status(400).json({ error: 'Member not found!' });
  }

  const member = {
    ...foundMember,
    birth: birthFormat(foundMember.birth),
    blood: bloodFormat(foundMember.blood),
    created_at: datePt(foundMember.created_at),
  };

  return res.render('members/show', { member: member });
};

//render create
exports.create = function(req, res) {
  return res.render('members/create');
};

// create
exports.post = function(req, res) {
  const keys = Object.values(req.body);

  for (let index = 0; index < keys.length; index++) {
    if (keys[index] === '') {
      return res.status(400).json({ error: 'fill in all the fields!' });
    }
  }

  let {
    avatar_url,
    birth,
    name,
    blood,
    gender,
    email,
    weight,
    height,
  } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(Math.floor(Math.random() * 1000000000) + 1);

  data.members.push({
    id,
    name,
    birth,
    avatar_url,
    gender,
    blood,
    email,
    weight,
    height,
    created_at,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.status(500).json({ error: 'Write error!' });

    return res.redirect('/members');
  });
};

// edit
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(member => {
    return id == member.id;
  });

  if (!foundMember) {
    return res.status(400).json({ error: 'Member not found!' });
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  };

  return res.render('members/edit', { member });
};

//put
exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function(member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) {
    return res.status(400).json({ error: 'Member not found!' });
  }

  let {
    avatar_url,
    birth,
    name,
    blood,
    gender,
    email,
    weight,
    height,
  } = req.body;

  const member = {
    id: Number(id),
    name,
    avatar_url,
    gender,
    blood,
    email,
    weight,
    height,
    birth: Date.parse(birth),
    created_at: foundMember.created_at,
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      return res.status(500).send('Write error!');
    }

    return res.redirect(`/members/${id}`);
  });
};

// delete
exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredMembers = data.members.filter(function(member) {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.status(500).json({ err: 'Write file error!' });

    return res.redirect('/members');
  });
};
