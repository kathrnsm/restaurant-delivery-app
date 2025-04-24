CREATE DATABASE IF NOT EXISTS dostavka_db;
USE dostavka_db;

CREATE TABLE Clients (
    idClients INT AUTO_INCREMENT PRIMARY KEY,
    FIOclient VARCHAR(100),
    Address VARCHAR(255),
    Phone VARCHAR(20) UNIQUE,
    Password VARCHAR(100)
);

CREATE TABLE Deliverymen (
    idDeliveryman INT AUTO_INCREMENT PRIMARY KEY,
    FIOdeliveryman VARCHAR(100),
    Phone VARCHAR(20)
);

CREATE TABLE Positions (
    idPositions INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Price DECIMAL(10, 2)
);

CREATE TABLE Orders (
    idOrders INT AUTO_INCREMENT PRIMARY KEY,
    clientId INT,
    deliverymanId INT,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES Clients(idClients),
    FOREIGN KEY (deliverymanId) REFERENCES Deliverymen(idDeliveryman)
);

CREATE TABLE OrderPositions (
    idOrderPosition INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    positionId INT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT,
    total DECIMAL(10, 2),
    FOREIGN KEY (orderId) REFERENCES Orders(idOrders),
    FOREIGN KEY (positionId) REFERENCES Positions(idPositions)
);

INSERT INTO Clients (FIOclient, Address, Phone, Password) VALUES
('Иванов Иван Иванович', 'ул. Ленина, 10', '89990001122', '123456'),
('Петров Петр Петрович', 'ул. Гагарина, 5', '89990002233', '098765');

INSERT INTO Deliverymen (FIOdeliveryman, Phone) VALUES
('Курьер 1', '89991112233'),
('Курьер 2', '89992223344');

INSERT INTO Positions (Name, Price) VALUES
('Пицца Маргарита', 450.00),
('Бургер', 300.00),
('Суши сет', 600.00),
('Салат Цезарь', 350.00),
('Кола 0.5', 100.00);

INSERT INTO OrderPositions (orderId, name, price, quantity)

INSERT INTO Orders (clientId, orderDate, address) VALUES (?, NOW(), ?)