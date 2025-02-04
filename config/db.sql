CREATE DATABASE oboiShop;
use oboiShop;

CREATE Table user(
    id int PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100),
    role ENUM("user","admin","superadmin") DEFAULT "user"
)

CREATE Table product(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL,
    brand_id INT NOT NULL,
    Foreign Key (brand_id) REFERENCES brands(id),
    country_id INT NOT NULL,
    Foreign Key (country_id) REFERENCES country(id),
    price INT NOT NULL,
    old_price INT NOT NULL,
    available BOOLEAN,
    decription_uz VARCHAR(255),
    decription_ru VARCHAR(255),
    washable BOOLEAN,
    size VARCHAR(55)
);

CREATE Table order(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES user(id),
    total_price INT NOT NULL
);

CREATE TABLE orderItem(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    Foreign Key (product_id) REFERENCES product(id),
    order_id INT NOT NULL,
    Foreign Key (order_id) REFERENCES order(id),
    total_count INT NOT NULL,
    total_price INT NOT NULL
);
