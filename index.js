const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yf6o8.mongodb.net/airCnc?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());


// MongoDB Database

client.connect(err => {
    const experiencesCollection = client.db("airCnc").collection("experiences");
    const homesCollection = client.db("airCnc").collection("homes");
    const hotelsCollection = client.db("airCnc").collection("hotels");
    // perform actions on the collection object

    //   get experiences data
    app.get("/experiences", (req, res) => {
        experiencesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    //   get Homes Data
    app.get("/homes", (req, res) => {
        homesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //   get hotels Data
    app.get("/hotels", (req, res) => {
        hotelsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // //   add experience data
    //   app.post("/addExperience", (req, res)=>{
    //       const experience = req.body;
    //       experiencesCollection.insertMany(experience)
    //       .then(result=>{
    //           res.send(result.insertedCount> 0)
    //       })
    //   })
    // //   add homes data
    //   app.post("/addHomes", (req, res)=>{
    //       const homes = []
    //       homesCollection.insertMany(homes)
    //       .then(result=>{
    //           res.send(result.insertedCount> 0)
    //       })
    //   })
    // //   add hotel data
    //   app.post("/addHotels", (req, res)=>{
    //       const hotels = []
    //       hotelsCollection.insertMany(hotels)
    //       .then(result=>{
    //           res.send(result.insertedCount> 0)
    //       })
    //   })


});

// add review by user
// app.post('/addReview', (req, res) => {
//     const review = req.body;
//     reviewsCollection.insertOne(review)
//         .then(result => {
//             res.send(result.insertedCount > 0);
//         })
// })

app.get('/', (req, res) => {
    res.send('hello home')
})

const port = 5000
app.listen(process.env.PORT || port)
