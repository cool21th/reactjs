const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/controller/users');
const load = require('./routes/controller/load');
const detail = require('./routes/controller/detail');
const profile = require('./routes/controller/profile');

const app = express();

//log
app.use(logger('dev'));
// Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/load', load);
app.use('/api/detail', detail);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));