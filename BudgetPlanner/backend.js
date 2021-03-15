
var keys = [0];


function addBudget(){               //Adds budget to session and inc keys
    var data = readFormData();
    keys[0]  += 1; 

    sessionStorage.setItem("budgetObj" +keys[0], JSON.stringify(data));

}


function readFormData() {          // Reads input from user and returns input in an array. 
    var obj = {}    // empty object
    obj.compName = document.getElementById("compName").value;
    obj.projName = document.getElementById("projName").value;
    obj.budget = document.getElementById("budget").value;
    console.log(obj);
    resetData();
    return obj; 
}

function printData(){           //Takes all the session keys. Loops through them and prints out the info into a table. 
    var sum = 0; 

    var len = sessionStorage.length;

    var obj = sessionStorage.getItem("budgetObj");
    var data = JSON.parse(obj);

    for(i = 1; i < len +1; i++){

        var obj = sessionStorage.getItem("budgetObj" +i);
        var data = JSON.parse(obj);
  
    if (obj != null) {

        var table = document.getElementById("L1");
        var body = table.getElementsByTagName("tbody")[0];
        var newRow = body.insertRow(body.length);  // row created 
       
        var cell1 = newRow.insertCell(0);          // cell created 
        cell1.innerHTML=data.compName;                 // value placed 
       
        var cell2 = newRow.insertCell(1);          // cell created 
        cell2.innerHTML=data.projName;                 // value placed

        var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.budget;

        sum += parseInt(data.budget);


        } else {
        document.write("Sorry its Table is empty");
        }
    }



    document.write("<br/>   <br/>")
    document.write(" Total budget is: " + sum + "<br/>"); 

}

function deleteAll(){                   // used to delete all session info and start again
    sessionStorage.clear();
    keys[0] =0 ; 
}



function resetData() {                 // Used to clear the boxes after an entry. 
    document.getElementById("compName").value="";
    document.getElementById("projName").value="";
    document.getElementById("budget").value="";
    
}
    


    