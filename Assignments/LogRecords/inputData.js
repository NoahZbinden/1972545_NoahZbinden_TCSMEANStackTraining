var fs = require('fs')
let obj = require("readline-sync");
let data = fs.readFileSync("info.JSON", (err) => console.log(err)); 
let arrayOfObjects = JSON.parse(data);
//console.log(arrayOfObjects)

let fname = obj.question(" Enter your First Name: ");
let lname = obj.question(" Enter your Last Name: ");
let gender = obj.question(" Enter your Gender Name: ");
let email = obj.question(" Enter your Email: ");
let date = new Date();

arrayOfObjects.logData.push({
    fName: fname,
    lname: lname,
    gender: gender,
    email: email,
    date: date
});

fs.writeFile("info.json", JSON.stringify(arrayOfObjects), (err) => {
    if(!err){
        console.log("Log Stored Correctly")
    } else{
        console.log(err)
    }
})
