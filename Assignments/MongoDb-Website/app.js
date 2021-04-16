let express = require("express");   // load the module 
let app = express();        // creating the reference of express module
let port =9090;
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));    // enable any format body data

//All info to connect to DB when needed 
let url = "mongodb://localhost:27017/courseList";
let obj = require("mongoose");  // Load Modules
obj.Promise = global.Promise;   // Create the reference         // All stuff for MongoDB using Mongoose
const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

// Schema Model Can be used easier
let courseDataSchema = obj.Schema({
    _id:Number, 
    courseName:String, 
    description:String, 
    amount:Number, 
});

let homePageInfo = `
    <h2> Course Platform <h2> 
    <a href="/add">Add Page</a> <br/> 
    <a href="/update">Update Page</a> <br/> 
    <a href="/delete">Delete Page</a> <br/> 
    <a href="/fetch">Fetch Page</a>
    `

let addPageInfo = `
<h2> Add Course </h2> 
    <form action="/add/course" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>

        <label>Course Name</label>
        <input type="text" name="courseName"/><br/>

        <label>Description</label>
        <input type="text" name="description"/><br/>

        <label>Amount</label>
        <input type="number" name="amount"/><br/>

        <input type="submit" value="Add Course"/>
        <input type="reset" value="Reset"/>
    </form>

`

let updatePageInfo =  `
<h2> Update Course Amount </h2> 
    <form action="/update/course" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>

        <label>Amount</label>
        <input type="number" name="amount"/><br/>

        <input type="submit" value="Change Amount"/>
        <input type="reset" value="Reset"/>
    </form>`

let deletePageInfo = `
<h2> Delete Course </h2> 
    <form action="/delete/course" method="post">
        <label>Course Id</label>
        <input type="number" name="courseId"/><br/>

        <input type="submit" value="Delete"/>
        <input type="reset" value="Reset"/>
    </form>`    

app.get("/",(req,res)=> {
        res.setHeader("content-type","text/html"); 
        res.write(homePageInfo);
        res.end()
})

app.get("/add",(req,res)=> {
        res.setHeader("content-type","text/html"); 
        res.write(addPageInfo);
        res.end()
})

app.get("/update",(req,res)=> {
        res.setHeader("content-type","text/html"); 
        res.write(updatePageInfo);
        res.end()
})

app.get("/delete",(req,res)=> {
    res.setHeader("content-type","text/html"); 
    res.write(deletePageInfo);
    res.end()
})

app.get("/fetch",(req,res)=> {
    obj.connect(url, mongooseDbOption) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log("////Error IN DB connection ADD////" + err))  // On Connection error
        // Creating Model using schema 
        //db.once("open",()=>{})
    let Course = obj.model("",courseDataSchema,"courseList");
    Course.find({},(err,result)=>{
        if(!err){
            res.send(result)
        }
        obj.disconnect();
    })
})

app.post("/delete/course",(req,res)=> {
    let courseId = req.body.courseId;
    obj.connect(url, mongooseDbOption) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log("////Error IN DB connection ADD////" + err))  // On Connection error
        // Creating Model using schema 
    //db.once("open",()=>{} )
    let Course = obj.model("",courseDataSchema,"courseList");
    Course.deleteOne({_id:courseId},(err,result)=> {
        if(!err){
            //console.log(result);
            if(result.deletedCount>0){
                    console.log("Record deleted ");
                    res.redirect('http://localhost:9090/');
            }else {
                    console.log("Record not present");
            }
        }
        obj.disconnect();
    })
})


app.post("/update/course",(req,res)=> {
    let courseId = req.body.courseId;
    let amount = req.body.amount;

    //res.send("Course Id : " + courseId + " Amount : " + amount)
    obj.connect(url, mongooseDbOption) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log("////Error IN DB connection ADD////" + err))  // On Connection error
        // Creating Model using schema 
    let Course = obj.model("",courseDataSchema,"courseList");
    Course.updateOne({_id:courseId},{$set:{amount:amount}},(err,result)=> {    
        if(!err){
            if(result.nModified>0){
                res.redirect('http://localhost:9090/');
                console.log("Record updated")
            }else {
                console.log("Record didn't update")
            }
        }
        obj.disconnect();
    })
})

app.post("/add/course",(req,res)=> {
    let courseId = req.body.courseId;
    let courseName = req.body.courseName;
    let description = req.body.description;
    let amount = req.body.amount;

    obj.connect(url, mongooseDbOption) // Ready to connect
    let db = obj.connection;
    db.on("error", (err) => console.log("////Error IN DB connection ADD////" + err))  // On Connection error
        // Creating Model using schema 
    let Course = obj.model("",courseDataSchema,"courseList");
        // Creating reference using model 
    let p1 = new Course({_id:courseId,courseName:courseName,description:description, amount:amount});
    p1.save((err,result)=>{
        if(!err){
            res.redirect('http://localhost:9090/');
            console.log("record inserted successfully")
        }else {
            console.log(err);
            res.send("Error Record could not be added" + err)
        }
        obj.disconnect();       //close the connectiond..
    })
})

app.listen(port,()=>console.log(`Server running on port nubmer ${port}`));