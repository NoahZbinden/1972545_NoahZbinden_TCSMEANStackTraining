let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
console.log("Got Here")

let url = "mongodb://localhost:27017/chatLog";
let obj = require("mongoose");  // Load Modules
obj.Promise = global.Promise;   // Create the reference         // All stuff for MongoDB using Mongoose
const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
// Schema Model Can be used easier
let chatLogSchema = obj.Schema({
    name:String, 
    msg:String, 
});

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    socket.on("chat",(msg)=> {
        obj.connect(url, mongooseDbOption);
        let db = obj.connection;
        db.on("error", (err) => console.log("Connection Errror " + err))
        let ChatLog = obj.model("",chatLogSchema, "chatLog" )

        let p1 = new ChatLog({name: msg.x, msg:msg.y})
        p1.save((err, res) => {
            if (!err){
                console.log("Info Added")
            } else {
                console.log("Error Data could not be added")
            }
        })
        console.log("Hello " + msg.x);
        console.log("Your Message is : "+ msg.y);
    })
})

http.listen(9090, () => console.log(`Server is running on port number 9090`))