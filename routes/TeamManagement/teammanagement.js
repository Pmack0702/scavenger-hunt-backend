const express = require('express')
const Team = require('../../models/Team')

const router = express.Router();

// Get all Teams
router.get('/teams', async (res, req) => {
    try {
        const teams = await Team.find()
        res.status(200).json('Retrieve Successfully', teams) 
    } catch (error) {
        res.statusCode(500).json({ error : ' Failed to fetch teams '});
    
    }
});

// Create a new Team
router.post('/teams', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save()
        res.status(201).json('Team Create Successfully', team);
    } catch (error) {
        res.status(400).json({ error: 'Failed to Create Team '});
    }
})

// Add a Member to Team
router.post('/:id/members', async (res, req) => {
    try {
        const team = await Team.findById(req.params.id);
        team.members.push(req.body);
        await team.save();
        res.status(201).json('Team Added successfully' , team);
    } catch (error) {
        res.status(400).json({error: 'Failed to add a member'})
    }
})

// Delete a member from a Team
router.delete(':id/members/:memberid' , async (res, req) => {
    try {
        const team = await Team.findById(req.params.id)
        team.members = team.members.filter((m) => m._id.toString() !== req.params.memberId);
        await team.save();
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete a Member'})
        
    }
})

module.exports = router;
