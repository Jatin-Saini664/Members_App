const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members'); // Upper case M in members signify that it is a module.  // first ../ means outside api folder and second ../ means outside routes folder

// Gets all members
router.get('/', (req, res) => {
  res.json(members); // we don't need to stringify. it will take acre of it
});

// Get Single Member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Members
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  } // if don't write an else then it give error headers sre already set. so in order to remove it make a return statement.

  // members is a hard coded array and we are pushing on newMembers. // newMembers is added to an array.
  members.push(newMember);
  //res.json(members); // we need to send a response .
  res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name; // name will update if it was sent by req otherwise we will send original name
        member.email = updMember.email ? updMember.email : member.email;
      }

      res.json({ msg: 'Member Updated', member: member }); // or we can just write member
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id)); // returning member.id === parseInt(req.params.id) to found

  if (found) {
    res.json({
      msg: 'Member Deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id)) // we want to return all members
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
