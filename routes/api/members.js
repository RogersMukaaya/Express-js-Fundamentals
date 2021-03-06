const e = require('express');
const express = require('express');
const router = express.Router();

const uuid = require('uuid');

const members = require('../../Members');

// Always use router instead of app 

// Building a Rest API
// Get all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get Single Member
router.get('/:id', (req, res) => {
    // Some returns a boolean if one of the elements in the array
    // passes the condition provided in the function
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        return res.status(400).json({ msg: `Member not found with ${req.params.id}` });
    }
});

// Create Member
router.post('/', (req, res) => {
    // Create a new member
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }

    // Check if the user has sent a name and an email
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Name and email are required' })
    }

    members.push(newMember);

    // Usually when we are dealing with server rendered view,
    // we redirect to the home page rather than return json
    res.redirect('/');
});

// Update a member's info
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member })
            }
        });
    } else {
        return res.status(400).json({ msg: 'Member not found' });
    }
})

// Delete a member's info
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt
        (req.params.id)) });
    } else {
        return res.status(400).json({ msg: 'Member not found' });
    }
})

module.exports = router;