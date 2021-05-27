// Bring in express
const express = require('express');

// Node module that deals with paths
const path = require('path');

// const logger = require('./logger');

const { json } = require('express');

// Entry point -- Using express
const app = express();

// Initialize middleware
// app.use(logger);

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// End point, '/' or slash represents the route for the index page
// app.get('/', (req, res) => {
//     // When someone visits '/' respond with some text
//     // res.send('Hello from Express');

//     // Send File
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// });

// In order to use the data that is being sent in the body,
// we need to use a body parser, before we had to install it
// separately but with the new version of express, it comes with it 
// and we have to just include it as any other piece of middle ware

// Body parser Middleware
// Handle raw json
app.use(express.json());

// Handle URL encoded data
app.use(express.urlencoded({ extended: false }));

// Set static folder, while building a static server
// Use is used to include middle to the application
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

// Set up port, when we deploy the server is most likely not going to run
// on port 5000, it will have the port number in an environment variable so we
// want to first check for it, otherwise we shall serve the app on port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 