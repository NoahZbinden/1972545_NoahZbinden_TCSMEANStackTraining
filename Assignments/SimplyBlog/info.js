var a = localStorage.length;
if (a == null){
    a = 0; 
}
var keys = [a];
function addBlog(){
    var title = document.getElementById("title").value;
    var descrp = document.getElementById("desc").value;
    var imageInfo = document.getElementById("imageId").files[0].name;

    console.log(title);
    console.log(descrp)
    console.log(imageInfo);

    document.getElementById("titleInfo").innerHTML = title; 
    document.getElementById("descInfo").innerHTML = descrp; 
    document.getElementById("imageInfo").src = imageInfo; 

    
}

function readFormData() {      // Reads input from user and returns input in an array. 
    var obj = {}    // empty object

    //Easy to store because they are text
    obj.title = document.getElementById("title").value;
    obj.desc = document.getElementById("desc").value;
    obj.img = document.getElementById("imageId").files[0].name;

    console.log(obj);
    //resetData();
    return obj; 
}



function addPost(){               //Adds budget to session and inc keys
    var data = readFormData();
    keys[0]  += 1; 

    localStorage.setItem("blogInfo" +keys[0], JSON.stringify(data));
    printData();
}

function printData(){
    location.reload();
    document.getElementById("h1").innerHTML = "<h1> Previous Posts </h1>"; 

    var sum = 0; 
    var len = localStorage.length;


    for(i = 1; i < len +1; i++){
        var obj = localStorage.getItem("blogInfo" +i);
        var data = JSON.parse(obj);
        if (obj != null) {


            var table = document.getElementById("L1");
            var body = table.getElementsByTagName("tbody")[0];
            var newRow = body.insertRow(body.length);  // row created 
    
            var cell11 = newRow.insertCell(0);          // cell created 
            var cell12 = newRow.insertCell(1);
            var cell13 = newRow.insertCell(2);
            var cell14 = newRow.insertCell(3);
            cell13.innerHTML="<h2 >" + data.title + "</h2>";                // value placed 

            var newRow2 = body.insertRow(body.length);  // row created 

            var cell21 = newRow2.insertCell(0);          // cell created 
            var cell22 = newRow2.insertCell(1);
            var cell23 = newRow2.insertCell(2);
            var cell24 = newRow2.insertCell(3);
            cell23.innerHTML= "<p> " + data.desc + "</p>"; 
            //cell3.innerHTML = data.img;
            cell22.innerHTML="<img src='" + data.img +"' alt='hello' style='width:500px;height:600px padding-bottom: 100px';/>";
            "</br> </br> </br>"
            //document.getElementById("imageInfo").src =data.image

            var newRow3 = body.insertRow(body.length);

            var cell31 = newRow3.insertCell(0); 
            cell31.innerHTML = "</br>";


            var newRow4 = body.insertRow(body.length);
            var cell41 = newRow4.insertCell(0); 
            cell41.innerHTML = "</br>";

            var newRow5 = body.insertRow(body.length);
            var cell51 = newRow5.insertCell(0); 
            cell51.innerHTML = "</br>";

            
    
    
            } else {
            document.write("No Posts Have been made" + localStorage.length);
            keysReset()
            deleteAll();
            }
    }


}

function deleteAll(){                   // used to delete all session info and start again
    localStorage.clear();
}
function keysReset(){
    keys[0] = 0; 
}


