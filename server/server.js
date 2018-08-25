const config = require('./serverConfig');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const compression = require('compression');

mongoose.connect('mongodb://localhost/olxPakistan', { useNewUrlParser: true });
const app = express();
/*
const corsOptions = {
    origin: "http://localhost:5005",
    methods: ['GET', 'POST'],
    credentials: true
};
app.use(cors(corsOptions));
*/
app.use(cors()); //allow cors for all origins
// use compression library to optimize PWA
app.use(compression());

// For VsCode Debugger Server
app.use(express.static('./dist'));

// For external server
app.use(express.static('../dist'));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using session
app.use(session({
    secret: 'MySecretKey',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: false,
        secure: false,
    }
}));

// use passport JS Module for authentication purposes.
require('./modules/passport/passport')(app);

// App Routes
const firstRoutes = require('./Routes/FirstRoutes');
app.use('/', firstRoutes);

// Login Routes
const loginRoutes = require('./Routes/LoginRoutes');
app.use('/login', loginRoutes);

// Registration Routes
const registrationRoutes = require('./Routes/RegistrationRoutes');
app.use('/registration', registrationRoutes);

// Ads Routes
const adsRoutes = require('./Routes/AdsRoutes');
app.use('/ads', adsRoutes);

// Ads Routes
const messageRoutes = require('./Routes/MessageRoutes');
app.use('/messages', messageRoutes);

// handling error
app.use(function(error, req, resp, next){
  if (error) {
      console.log(error); //eslint-disable-line
      resp.send(error);
      next();
  } else {
      next();
  }
});

app.listen(config.port, function() {
    console.log('server is running on localhost:' + config.port); //eslint-disable-line
})