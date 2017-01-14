var inquirer = require('inquirer');
var db = require('mysql');

//create connection to a named database
var connection = db.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

////connect to database and greet customer with choices
connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon.");
    greetCustomer();
});

//greetCustomer();
//define customer interaction
var questions = [
    {
        type: 'input',
        name: 'itemId',
        message: 'Enter the item number of the product you want to buy.',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number    
    }, 
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number   
    }
]
//define greetCustomer and get order
function greetCustomer(){
        inquirer.prompt(questions).then(function (answers) {
        console.log('\nWe are checking your order:');
        console.log(JSON.stringify(answers, null, '  '));
        purchase(answers);
    });
};
// define purchase: check inventory and call to next function: fill order or reject order
function purchase (answers){
    var query = 'SELECT stock_quantity FROM products WHERE item_id ?';
    connection.query(query, {item_id:answers.itemId}, function(error, results, fields){
            console.log(results);
            if (answers.quantity >= results[0]) {
                reduceInventory();
            } else {
               rejectOrder();
            }
    });
};
//reduce inventory
function reduceInventory(){
    var query = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?';
    connection.query(query, [answers.quantity, answers.itemId], function(error, results, fields){
        console.log(results);
        console.log('Your order has been filled. Would you like to buy again?');
        greetCustomer();
    });
}
//reject order: inform customer and reprompt
function rejectOrder(){
    console.log('Sorry, we only have ' + res + ' in stock. Would you like to buy something else?');
    greetCustomer();
}