CREATE DATABASE oboiShop;
use oboiShop;

CREATE Table user(
    id int PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100),
    role ENUM("user","admin","superadmin") DEFAULT "user"
);

CREATE TABLE category(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE brands(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE country(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
);

CREATE TABLE categoryItem(
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_id INT,
    Foreign Key (category_id) REFERENCES category(id),
    Foreign Key (product_id) REFERENCES product(id)
);

