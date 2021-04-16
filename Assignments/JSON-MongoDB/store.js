const fs = require('fs');                       // Load in the JSON file and have it ready to be inputed as an array. 
let phoneData = fs.readFileSync('data.json')
let info = JSON.parse(phoneData);

let url = "mongodb://localhost:27017/phoneData";
let obj = require("mongoose");  // Load Modules
obj.Promise = global.Promise;   // Create the reference         // All stuff for MongoDB using Mongoose
const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
obj.connect(url, mongooseDbOption) // Ready to connect
let db = obj.connection;    // Connect to Database

    db.on("error", (err) => console.log("///////////// Error " + err))  // On Connection error
    db.once("open", (err1, res) => {
        let phoneDataSchema = obj.Schema({
            _id:Number, 
            source:String, 
            destination:String, 
            sourceLocation:String, 
            destinationLocation:String, 
            callDuration:String, 
            roaming:String, 
            callCharge:String
        });

        let PhoneData = obj.model("" , phoneDataSchema, "phoneData")
        PhoneData.insertMany(info, (err, res) => {
            if(!err){
                console.log("Data has been sent to MongoDB")
            } else {
                console.log("Not working error of some kind")
            }
            obj.disconnect();
        });
    })


