const mongoose = require('mongoose');
require('dotenv').config();

const onlineDb = process.env.DB;
const databaseName = 'JCSMAYAR';

// Ensure the database name is appended correctly
const mongoURI = `${onlineDb}/${databaseName}`;

mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    writeConcern: { w: "majority" }  // Optional: use this if specifically required
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
