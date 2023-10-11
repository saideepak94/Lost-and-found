const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// In-memory storage for lost items (replace this with a database in real-world scenarios)
const lostItems = [];

// API endpoint to get all lost items
app.get('/api/lostItems', (req, res) => {
    res.json(lostItems);
});

// API endpoint to submit a lost item
app.post('/api/submitLostItem', (req, res) => {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const lostItem = {
        name,
        description,
        image,
    };

    // Add the lost item to the array (in-memory storage)
    lostItems.push(lostItem);

    // Respond with the updated list of lost items
    res.json(lostItems);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
