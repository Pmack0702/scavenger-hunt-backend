const express = require('express')
const Team = require('../../models/Team')

const router = express.Router();

// Get all Teams
router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find()
        res.status(200).json({ message: 'Retrieve Successfully', teams });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    
    }
});

// Create a new Team
router.post('/teams', async (req, res) => {
    try {

        const team = new Team(req.body);
        await team.save()
        res.status(201).json({ message: 'Team Created Successfully', team });
    } catch (error) {

        console.error('Error:', error.message); // Log the exact error
        res.status(400).json({ error: 'Failed to Create Team', details: error.message });
    }
})
  

// Delete a Team
router.delete('/teams/:id', async (req, res) => {
    try {
      // Find and delete the team by ID
      const team = await Team.findByIdAndDelete(req.params.id);
  
      // Handle case where the team does not exist
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
  
      res.status(200).json({ message: 'Team deleted successfully', team });
    } catch (error) {
      console.error('Error:', error.message); // Log the exact error
      res.status(500).json({ error: 'Failed to delete team', details: error.message });
    }
  });
  

// Add a Member to Team
router.post('/:id/members', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        team.members.push(req.body);
        await team.save();
        res.status(201).json({ message: 'Team added successfully', team });
    } catch (error) {
        res.status(400).json({error: 'Failed to add a member'})
    }
})

// Delete a member from a Team
router.delete('/:id/members/:memberid', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Filter out the member with the given ID
        team.members = team.members.filter((m) => m._id.toString() !== req.params.memberid);
        await team.save();

        res.status(200).json({ message: 'Member deleted successfully', team });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete a Member', details: error.message });
    }
});

// Get Leaderboard: All Teams sorted by score
router.get('/leaderboard', async (req, res) => {
    try {
      const teams = await Team.find().sort({ score: -1 }); // Sort teams by score in descending order
      res.status(200).json({ message: 'Leaderboard fetched successfully', teams });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
    }
  });

module.exports = router;
