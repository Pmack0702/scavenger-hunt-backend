const mongoose = require('mongoose');

const POISchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String},
    task: {type: String, required: true},
    tags: { type: [String] },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    teamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] // Link to multiple teams

});

module.exports = mongoose.model('POI' , POISchema);