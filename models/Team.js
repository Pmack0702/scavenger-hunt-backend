const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Represents the team name
    // Representating an individual team membr, array of object of teams
    members: [
        {
            name : { type: String },
            email: { type: String, },
            role: { type: String }
        },
    ],
    poiIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'POI' }], // Link to multiple POIs
    score: { type: Number, default: 0 }, // Score field with default value

}) 

module.exports =  mongoose.model('Team', TeamSchema);