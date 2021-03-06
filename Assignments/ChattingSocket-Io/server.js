let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
console.log("Got Here")

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    
    socket.on("chat",(msg)=> {
        console.log("Hello " + msg.x);
        console.log("Your Message is : "+ msg.y);
    })
})

http.listen(9090, () => console.log(`Server is running on port number 9090`))