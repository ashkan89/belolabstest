const Save = require('../models/save');

exports.saveGameData = async (req, res) => {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body); 

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

// Fetch game records
exports.fetchGameRecords = async (req, res) => {
    const { userID } = req.query;

    try {
        if (!userID) {
            return res.status(400).json({ message: 'Missing userID in query parameters' });
        }

        const records = await Save.find({ userID }).sort({ gameDate: -1 }); // Sort by most recent
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching game records:', error);
        res.status(500).json({ message: 'Error fetching game records', error });
    }
};
