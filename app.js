const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user-routes');
const teamRoutes = require('./routes/team-routes');
const calcRoutes = require('./routes/calculate-route');

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.use('/api/user', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/calc', calcRoutes)

url = 'mongodb+srv://eitan_z:eitan444@cluster0.ggcbg.mongodb.net/teams-generator?retryWrites=true&w=majority'


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(5000);
    console.log('all good')
})
.catch(err => console.log('notsogood'))