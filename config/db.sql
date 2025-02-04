CREATE DATABASE oboiShop;
use oboiShop;

CREATE Table user(
    id int PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100),
    role ENUM("user","admin","superadmin") DEFAULT "user"
)