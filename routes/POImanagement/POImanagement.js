const express = require('express');
const POI = require('../../models/POI'); // Imported POI Model
const Team = require('../../models/Team'); // Import Team Model


const router = express.Router();

// GET all POI from the database, and sends an error message if fails
router.get('/pois', async (req, res) => {
    try {
      const pois = await POI.find();
      res.json(pois);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch POIs' });
    }
});

/* 
    POST to create a POI and saves into the database
    it extracts the details from the request body and create a new POI
*/
router.post('/pois', async (req, res) => {
    

    try {
        // You can also get the data from the request body and save it in a variable and then create a new POI
        // Instead, you can directly get the POI from the req.body and store in a variable and then save it
        const poi = new POI(req.body);
        console.log('Incoming data:', req.body); // Log the data
        poiscreated = await poi.save();
        res.status(201).json({message: 'POI created successfully', POI: poiscreated }); // Respond with a status coode and JSON DATA
    } catch (error) {
      res.status(400).json({ error: 'Failed to create POI' });
    }
});

/*
    endpoint upates a POI details with a specific ID
    It takes the updated data from the request body and ID from the parameter and return the updated POI
*/
router.put('/pois/:pid', async (req, res) => {
    const { pid } = req.params;
    console.log(pid)
    const updateddata = req.body; // get the updated data
    try{
        const updatedPOI = await POI.findByIdAndUpdate(pid, updateddata, { new: true }); // FInd the POI and update it
        if(updatedPOI){
            res.status(200).json({message: ' POI Update Sucessfully'})
        } else{
            res.status(404).json({message: 'POI Not Found'})
        }
    }catch(error){
        res.status(500).json({ message: 'Error updating POI ', error });    }

    });

/*
    This endpoint Delete the POI from the Database using the id
    It returns a 204 status if successful, and 404 if the POI isn't found.
*/
router.delete('/pois/:pid', async (req, res) => {
    const { pid } = req.params;
    try{
        const deletedPOI = await POI.findByIdAndDelete(pid); // FInd the POI and Delete it
        if(deletedPOI){
            res.status(200).json({message: ' POI Deleted Sucessfully'})
        } else{
            res.status(404).json({message: 'POI Not Found'})
        }
    }catch(error){
        res.status(500).json({ message: 'Error deleted POI', error });    }

    });

    // Link a team to a POI
router.put('/pois/:pid/team', async (req, res) => {
    const { pid } = req.params; // POI ID from URL params
    const { teamId } = req.body; // Team ID from request body
  
    try {
      // Find the POI by its ID
      const poi = await POI.findById(pid);
      if (!poi) {
        return res.status(404).json({ message: 'POI not found' });
      }
  
      // Find the team by its ID
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      // Add the team ID to the POI's teamIds array if it's not already there
      if (!poi.teamIds.includes(teamId)) {
        poi.teamIds.push(teamId);
        await poi.save(); // Save the updated POI document
        return res.status(200).json({ message: 'Team successfully linked to POI', poi });
      } else {
        return res.status(400).json({ message: 'This team is already linked to this POI' });
      }
  
    } catch (error) {
      console.error('Error linking team to POI:', error);
      res.status(500).json({ message: 'Error linking team to POI', error: error.message });
    }
  });

  router.get('/pois/:pid/team', async (req, res) => {
    const { pid } = req.params;
    try {
      const poi = await POI.findById(pid).populate('teamIds'); // Populate linked team(s)
      if (!poi) {
        return res.status(404).json({ message: 'POI not found' });
      }
      res.status(200).json({ team: poi.teamIds });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

module.exports = router;