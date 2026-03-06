CREATE DATABASE IF NOT EXISTS cafe_bd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafe_db;

CREATE TABLE IF NOT EXISTS `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    role ENUM('user', 'admin', 'employee') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    img_path VARCHAR(255),
    percent_discount DECIMAL(5, 2) DEFAULT NULL CHECK (percent_discount BETWEEN 0 AND 100),
    is_available BOOLEAN DEFAULT true,
    category_id INT NOT NULL,

    KEY idx_category_id (category_id),

    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS cafe_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT UNIQUE NOT NULL,
    is_available BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS favourite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,

    KEY idx_favourite_product_id (product_id),
    KEY idx_favourite_user_id (user_id),

    CONSTRAINT fk_favourite_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    CONSTRAINT fk_favourite_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE,

    UNIQUE KEY unique_favourite (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity > 0),
    product_id INT NOT NULL,
    user_id INT NOT NULL,

    KEY idx_cart_product_id (product_id),
    KEY idx_cart_user_id (user_id),

    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE,

    UNIQUE KEY unique_cart (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pickup_time DATETIME NOT NULL,
    is_in_cafe BOOLEAN NOT NULL,
    status ENUM('pending', 'processing', 'completed') NOT NULL DEFAULT 'pending',
    user_id INT NOT NULL,
    table_id INT,

    KEY idx_order_user_id (user_id),
    KEY idx_order_table_id (table_id),
    INDEX idx_order_created_at (created_at),

    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE RESTRICT,
    CONSTRAINT fk_order_table FOREIGN KEY (table_id) REFERENCES cafe_table(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,

    KEY idx_order_items_order_id (order_id),
    KEY idx_order_items_product_id (product_id),

    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT
);