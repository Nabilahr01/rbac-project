CREATE DATABASE schema_db
USE schema_db

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50),
password_hash VARCHAR(255)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
role_name VARCHAR(50)
);

CREATE TABLE permissions (
id INT AUTO_INCREMENT PRIMARY KEY,
permission_name VARCHAR(100)
);

CREATE TABLE user_roles (
user_id INT,
role_id INT
);

CREATE TABLE role_permissions (
role_id INT,
permission_id INT
);

CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
department VARCHAR(50),
status VARCHAR(20)
);

INSERT INTO roles (id, role_name) VALUES
(1, 'Admin'),
(2, 'Editor'),
(3, 'Viewer');

INSERT INTO users (id, username, password_hash) VALUES
(1, 'admin1', '$2b$10$hashAdmin'),
(2, 'editor1', '$2b$10$hashEditor'),
(3, 'viewer1', '$2b$10$hashViewer');

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1),
(2, 2),
(3, 3);

/*SELECT u.id, u.username, r.role_name
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.username = */

SELECT COUNT(*) FROM employees;
