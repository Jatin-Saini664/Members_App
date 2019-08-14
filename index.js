const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger.js');
const members = require('./Members');

const app = express();

// Init middleware(intialise middleware)
//app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json()); // genrating a body parser
app.use(express.urlencoded({ extended: false })); // we can handle url encoded data with express

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//static folder is not shown up because it is below homepage route
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// install nodemon by npm i -D nodemon. // nodemon is a dev dependency. it cannot be used in development.
// to run write run npm dev
// to restart enter rs
// For local installation of nodemon use npx nodemon for restarting the server
