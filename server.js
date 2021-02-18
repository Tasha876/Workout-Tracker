// Dependencies
// =============================================================
const express = require('express');

// Sets up the Express App
// ============================================================

const mongo = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static('public'));

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// Routes
// =============================================================
const api_routes = require('./routes/api_routes')(app);
const controller = require('./routes/html_routes')(app);
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
