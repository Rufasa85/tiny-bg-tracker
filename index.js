const express = require('express');
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require("./config/connection")
const allRoutes = require('./controllers');

// Requiring our models for syncing
const {Game, Note,Play} = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.create({}).engine);
app.set('view engine', 'handlebars');



app.use('/',allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});