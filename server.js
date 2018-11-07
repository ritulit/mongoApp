// Requires:
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Create express app:
var app = express();

// Use middlewares:
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let mongoUri ="mongodb://admin:admin@cluster0-shard-00-00-rd860.mongodb.net:27017,cluster0-shard-00-01-rd860.mongodb.net:27017,cluster0-shard-00-02-rd860.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
let mongoOptions ={useNewUrlParser: true};
// Connect to MongoDB: 
mongoose.connect(mongoUri,mongoOptions, (err) => {
    //check if connection works ok
    if (err)
    console.log(`${err.message}\n${err.stack}\n`);
    else{
        console.log("We're connected to MongoDB.");
        console.log(mongoose.connection.readyState) ;  
    }
    
});


// Create Model (each collection in the DB will have a new `mongoose.model`): 
let BikeCollection = mongoose.model("Bike", {
    frame_colors: Array,
    thumb: String,
    title: String,
    serial: String,
    manufacturer_name: String,
    frame_model: String,
    year: Number
});


//  let p1 = new BikeCollection({frame_colors: ["Blue"],
//     thumb: "hhhh",
//     title: "bike1",
//     serial: "W3E4rtr",
//     manufacturer_name: "Wilson",
//     frame_model: "REX1234",
//     year: 2012});
//  p1.save(function (err) {
//    if (err)
//     console.log(err.message);
//    // saved!
//  });

// ---------- CRUD ----------

// Get all bikes:
app.get("/api/bike", (request, response) => {
    BikeCollection.find({})
    .then(products => response.status(200).send(products))
    .catch(err => response.status(400).send(err));
});

// Add bike: 
app.post("/api/bike",  (request, response)=> {
    var product = new BikeCollection(request.body);
    product.save();
    response.status(201); // Created.
    response.send(product);
});



// Update  bike: 
app.put("/api/bike", (request, response) =>{

    BikeCollection.findOne({_id: request.query.id})

    .then(product => {
        
        for(key in request.body){
         product[key] = request.body[key];   
        }

        //product.title=request.body.title;
        //product.year=request.body.year;

        product.save();
        response.status(200).send(product);
    })
    .catch(err => response.status(400).send(err.message));

});

// Delete bike: 
app.delete("/api/bike", (request, response) => {
    BikeCollection.remove({_id: request.query.id})
    .then(() => response.status(204).send())
    .catch(err => response.status(400).send(err));
});



// Run server: 
app.listen(3000,  () => {
    console.log("Listening on http://localhost:3000");
});