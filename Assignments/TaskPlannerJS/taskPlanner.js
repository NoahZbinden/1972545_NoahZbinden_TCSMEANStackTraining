let http = require("http");
let url = require("url");
var fs = require('fs')
let port=9090;
let arrayUnqTasks = [];

// create array Task array 

let taskInfo = `
    <form action="/store" method="get">
        <label>Emp Id</label>
        <input type="text" name="empId"/><br/>
        <label>Task Id</label>
        <input type="text" name="taskId"/><br/>
        <label>Task Details</label>
        <input type="text" name="taskInfo"/><br/>
        <label>Date due</label>
        <input type="date" name="date"/><br/>
        <input type="submit" value="Add Task"/>
        <input type="reset" value="Reset"/>
    </form>

    <form action="/delete" method="get">
        <label>Task Id</label>
        <input type="text" name="taskId"/><br/>
        <input type="submit" value="Delete Task"/>
    </form>

    <form action="/display" method="get">
        <label>Search Task by Employe ID</label>
        <input type="text" name="empId"/><br/>
        <input type="submit" value="Search"/>
    </form>
`

let tableFront = `
<table>
        <tr> 
            <th> Employee Id</th>
            <th> Task Id</th>
            <th> Task Info </th>
            <th> Date </th> 
        </tr>
` 
let tableEnd = ` </table> `
let homeButton = `
    <input type="button" value="Home Page" onclick="location.href = 'http://localhost:9090/';"/>
    `
let server = http.createServer((req,res)=> {
    console.log(req.url)
    if(req.url != "/favicon.ico"){
        res.setHeader("content-type","text/html");          // by default data consider as a html 
        var pathInfo = url.parse(req.url,true).pathname;    // Needed to go from one page to another?
        if(req.url=="/"){
            res.write(taskInfo);
        }
        else if(pathInfo=="/store"){
           // res.setHeader("content-type","text/html");
            let data = url.parse(req.url,true).query;
            res.write("Your Item Information <br/>");
            let empId = data.empId;                             //Store the data from url into vars
            let taskId = data.taskId;
            let taskInfo = data.taskInfo;
            let date = data.date; 

            res.write("The Empolyee Id is : " + empId)
            res.write("<br/> The Task Id is : " + taskId)
            res.write("<br/> The Task Info is : " + taskInfo)
            res.write("<br/> The Date is : " + date)
    
            let jsonData = fs.readFileSync("taskInfo.JSON", (err) => console.log(err));     //Read info from JSON file
            let arrayOfObjects = JSON.parse(jsonData);
            var numTasks = Object.keys(arrayOfObjects.taskData).length;                     //Get length of JSON array
        
            for(i = 0; i < numTasks; i++){                                                  //Check if TaskID is unique or not
                if(!arrayUnqTasks.includes(arrayOfObjects.taskData[i].taskId)){         
                    arrayUnqTasks.push(arrayOfObjects.taskData[i].taskId)                   //If so add it to arrayUnqTask
                }   
            }
           // res.write(JSON.stringify(arrayUnqTasks));                                       

            if(!arrayUnqTasks.includes(taskId)){                //If Task ID is not already in unique array. Push new data to JSON Array
                arrayOfObjects.taskData.push({                  //Push the new items into the array
                    empId: empId,
                    taskId: taskId,
                    taskInfo: taskInfo,
                    date: date
                });
                res.write("<br/> Task has been stored ");
            } else {
                res.write("<br/> That Task ID is already Taken please go back and enter another ")
            }
          
            fs.writeFile("taskInfo.json", JSON.stringify(arrayOfObjects), (err) => {    //Simply write new array back into JSON  
                if(!err){
                    console.log("<br/> Task has been stored ");
                } else{
                    console.log(err);
                }
            })
            res.write("<br/>" +homeButton);
            res.end();
        }else if(pathInfo=="/delete"){
            let jsonData = fs.readFileSync("taskInfo.JSON", (err) => console.log(err));     //Read info from JSON file
            let arrayOfObjects = JSON.parse(jsonData);
            let data = url.parse(req.url,true).query;
            let taskId = data.taskId;

            var numTasks = Object.keys(arrayOfObjects.taskData).length;                     //Get length of JSON array
        
            for(i = 0; i < numTasks; i++){                                                  //Check if TaskID is unique or not
                if(!arrayUnqTasks.includes(arrayOfObjects.taskData[i].taskId)){         
                    arrayUnqTasks.push(arrayOfObjects.taskData[i].taskId)                   //If so add it to arrayUnqTask
                }   
            }

            res.write("Welcome to the Delete Page: <br/>");
            res.write(" Task Id is : "+ taskId)

            if(arrayUnqTasks.includes(taskId)){                     //If arrayUnqTasks has that task id then splice it from the JSON object    
                let i = arrayUnqTasks.indexOf(taskId)
                arrayUnqTasks.splice(i,1)
                arrayOfObjects.taskData.splice(i,1)
                res.write("<br/> Task was Deleted");

            } else {
                res.write("<br/> Sorry there is not a task with that specific Id listed.")
            }
           // res.write(JSON.stringify(arrayOfObjects))
            
            fs.writeFile("taskInfo.json", JSON.stringify(arrayOfObjects), (err) => {    //Simply write new array back into JSON  
                if(!err){
                    console.log("Tasks Stored ");
                } else{
                    console.log(err);
                }
            })
            res.write("<br/>" +homeButton);
            res.end();
        }else if([pathInfo]=="/display"){
            let jsonData = fs.readFileSync("taskInfo.JSON", (err) => console.log(err));   //Reading info from data
            let arrayOfObjects = JSON.parse(jsonData);
            let data = url.parse(req.url,true).query;                       //Query needed for to get User Data
            var numTasks = Object.keys(arrayOfObjects.taskData).length;     //Needed for loop length
            res.write("Tasks with  Employee Id: " +data.empId)
            let tableMiddle = ``

            for(i = 0; i < numTasks; i++){
                //if(arrayOfObjects.taskData[i].empId == data.empId){     // Makes sure to only add the tasks with the right employee ID
                let x = `
                <tr>
                    <td>${arrayOfObjects.taskData[i].empId}</td>
                    <td>${arrayOfObjects.taskData[i].taskId} </td>
                    <td>${arrayOfObjects.taskData[i].taskInfo} </td>
                    <td>${arrayOfObjects.taskData[i].date} </td>
                </tr>
                `
                tableMiddle +=x; 
               // }
            }

            res.write(tableFront + tableMiddle + tableEnd)
            res.write(homeButton);
            res.end()
        }
    }
});
server.listen(port,()=>console.log(`Server running on port number ${port}`));

    

