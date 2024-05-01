CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255)
);

-- Insert an admin user (ensure to hash the password appropriately)
INSERT INTO users (username, password, address) VALUES ('admin', 'hashed_admin_password', 'admin_address');
