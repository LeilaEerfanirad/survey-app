const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
var PORT = 3200


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

mongoose.connect(
    "mongodb://127.0.0.1:27017/surveyapp",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB is connected");
    })
    .catch(err => {
        console.log(err);
    })

app.use('/api', routes)


app.listen(PORT, function () {
    console.log(`server is running on port ${PORT}`);
})