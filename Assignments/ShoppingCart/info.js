var itemNames = ["Iphone XR", "Samsung Plus", "Xperia M", "Nokia Flip", "Landline", "BlueBerry"];
var itemPrice = [1200, 950, 550, 50, 75, 220];
var rowNum = 0;
var cartNum = localStorage.length.valueOf();
var keys = cartNum;
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
function addItem(item) {
    console.log("Hello it got here with this num: " + item);
    var obj = new Array();
    obj.push(itemNames[item]);
    obj.push(itemPrice[item]);
    localStorage.setItem("cartInfo" + cartNum, JSON.stringify(obj));
    location.reload();
}
//var table = document.getElementById("L1");
function printTable() {
    var sum = 0;
    for (i = 0; i < cartNum; i++) {
        console.log(i);
        var obj = localStorage.getItem("cartInfo" + i);
        var data = JSON.parse(obj);
        var table = document.getElementById("L2");
        console.log(table);
        var body = table.getElementsByTagName("tbody")[0];
        var newRow = body.insertRow(rowNum);
        var cell10 = newRow.insertCell(0);
        cell10.innerHTML = i.toString();
        var cell11 = newRow.insertCell(1);
        cell11.innerHTML = data[0];
        var cell12 = newRow.insertCell(2);
        cell12.innerHTML = data[1].toString();
        sum += data[1];
        rowNum++;
    }
    document.write("<h3> The sum is : " + sum + "</h3>");
}
for (var i = 0; i < 6; i++) {
    if (document.getElementById("h3") != null) {
        document.getElementById("h3").innerHTML = " Number of Items:  " + cartNum;
        var table = document.getElementById("L1");
        console.log(table);
        var body = table.getElementsByTagName("tbody")[0];
        var newRow = body.insertRow(rowNum);
        var cell11 = newRow.insertCell(0);
        cell11.innerHTML = "Prodcut Name: " + itemNames[i];
        rowNum++;
        var newRow2 = body.insertRow(rowNum);
        var cell12 = newRow2.insertCell(0);
        cell12.innerHTML = "Product Price: " + itemPrice[i];
        rowNum++;
        var newRow3 = body.insertRow(rowNum);
        var cell13 = newRow3.insertCell(0);
        cell13.innerHTML = "<input type= 'button' value='Add Item' onclick='addItem(" + i + ")'> <br/> <br/>"; //addItem(\i)
        rowNum++;
    }
}
