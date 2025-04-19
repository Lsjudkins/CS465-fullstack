const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST method adds a trip

// Route for getting or updating a trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .post(tripsController.tripsUpdateTrip);

module.exports = router;