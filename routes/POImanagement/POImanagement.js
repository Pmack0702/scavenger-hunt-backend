const express = require('express');
const POI = require('./models/POI'); // Imported POI Model

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
router.post('/pois/:id', async (req, res) => {
    const { pid } = req.params.id;
    const updateddata = req.body; // get the updated data
    try{
        const updatedPOI = await POI.findByIdAndUpdate(pid, updateddata, { new: true }); // FInd the POI and update it
        if(updatedPOI){
            res.status(200).json({message: ' POI Update Sucessfully'})
        } else{
            res.status(404).json({message: 'POI Not Found'})
        }
    }catch(error){
        res.status(500).json({ message: 'Error updating POI', error });    }

    });

/*
    This endpoint Delete the POI from the Database using the id
    It returns a 204 status if successful, and 404 if the POI isn't found.
*/
router.delete('/pois/:id', async (req, res) => {
    const { pid } = req.params.id;
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
module.exports = router;