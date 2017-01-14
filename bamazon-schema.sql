CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR (50),
price decimal(9,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);
USE Bamazon;
INSERT 
SELECT * FROM products;
LOAD DATA LOCAL INFILE 'products-import.csv' INTO TABLE products FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';
SELECT * FROM products;
