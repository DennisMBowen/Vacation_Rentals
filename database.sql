SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

-- --------------------------
-- DROP EXISTING TABLES
-- --------------------------
DROP TABLE IF EXISTS Property_Reservations;
DROP TABLE IF EXISTS Invoices;
DROP TABLE IF EXISTS Reservations;
DROP TABLE IF EXISTS Properties;
DROP TABLE IF EXISTS Property_Managers;
DROP TABLE IF EXISTS Guests;

-- --------------------------
-- TABLE CREATION
-- --------------------------

-- Guests Table
CREATE TABLE Guests (
    Guest_Id INT AUTO_INCREMENT NOT NULL,
    First_Name VARCHAR(45) NOT NULL,
    Last_Name VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL UNIQUE,
    Phone_Number VARCHAR(45),
    PRIMARY KEY (Guest_Id)
);

-- Property Managers Table
CREATE TABLE Property_Managers (
    Manager_Id INT AUTO_INCREMENT NOT NULL,
    First_Name VARCHAR(45) NOT NULL,
    Last_Name VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL UNIQUE,
    Phone_Number VARCHAR(45) NOT NULL,
    PRIMARY KEY (Manager_Id)
);

-- Properties Table
CREATE TABLE Properties (
    Property_Id INT AUTO_INCREMENT NOT NULL,
    Address_Line_1 VARCHAR(45) NOT NULL UNIQUE,
    Address_Line_2 VARCHAR(45),
    City VARCHAR(45) NOT NULL,
    State VARCHAR(2) NOT NULL,
    Zip INT NOT NULL,
    Price_Per_Night DECIMAL(8,2) NOT NULL,
    Beds INT NOT NULL,
    Baths INT NOT NULL,
    Pets_Allowed BOOLEAN NOT NULL,
    Monthly_Maintenance_Cost DECIMAL(8,2) NOT NULL,
    Manager_Id INT NOT NULL,
    PRIMARY KEY (Property_Id),
    FOREIGN KEY (Manager_Id) REFERENCES Property_Managers(Manager_Id)
);

-- Reservations Table
CREATE TABLE Reservations (
    Reservation_Id INT AUTO_INCREMENT NOT NULL,
    Check_In_Date DATE NOT NULL,
    Check_Out_Date DATE NOT NULL,
    Num_Of_Guests INT NOT NULL,
    Num_Of_Pets INT NOT NULL,
    PRIMARY KEY (Reservation_Id)
);

-- Property_Reservations Intersection Table (M:N)
CREATE TABLE Property_Reservations (
    Property_Reservation_Id INT AUTO_INCREMENT NOT NULL,
    Property_Id INT NOT NULL,
    Reservation_Id INT NOT NULL,
    PRIMARY KEY (Property_Reservation_Id),
    FOREIGN KEY (Property_Id) REFERENCES Properties(Property_Id),
    FOREIGN KEY (Reservation_Id) REFERENCES Reservations(Reservation_Id)
);

-- Invoices Table
CREATE TABLE Invoices (
    Invoice_Id INT AUTO_INCREMENT NOT NULL,
    Invoice_Date DATE NOT NULL,
    Total_Due DECIMAL(8,2) NOT NULL,
    Date_Paid DATE,
    Guest_Id INT NOT NULL,
    Reservation_Id INT NOT NULL,
    PRIMARY KEY (Invoice_Id),
    FOREIGN KEY (Guest_Id) REFERENCES Guests(Guest_Id),
    FOREIGN KEY (Reservation_Id) REFERENCES Reservations(Reservation_Id)
);

-- --------------------------
-- SAMPLE DATA INSERTION
-- --------------------------

-- Guests
INSERT INTO Guests (First_Name, Last_Name, Email, Phone_Number) VALUES
('John', 'Doe', 'john.doe@example.com', '5551112222'),
('Jane', 'Smith', 'jane.smith@example.com', NULL),
('Alice', 'Brown', 'alice.brown@example.com', '5553334444');

-- Property Managers
INSERT INTO Property_Managers (First_Name, Last_Name, Email, Phone_Number) VALUES
('Mark', 'Johnson', 'mark.johnson@example.com', '5555551234'),
('Emily', 'Taylor', 'emily.taylor@example.com', '5555555678'),
('Luke', 'Wilson', 'luke.wilson@example.com', '5555559999');

-- Properties
INSERT INTO Properties (Address_Line_1, Address_Line_2, City, State, Zip, Price_Per_Night, Beds, Baths, Pets_Allowed, Monthly_Maintenance_Cost, Manager_Id) VALUES
('123 Main St', NULL, 'Springfield', 'OR', 97477, 150.00, 3, 2, TRUE, 500.00, 1),
('456 Oak Ave', 'Apt 2', 'Eugene', 'OR', 97401, 200.00, 4, 3, FALSE, 750.00, 2),
('789 Pine Rd', NULL, 'Portland', 'OR', 97201, 120.00, 2, 1, TRUE, 400.00, 3);

-- Reservations
INSERT INTO Reservations (Check_In_Date, Check_Out_Date, Num_Of_Guests, Num_Of_Pets) VALUES
('2025-08-01', '2025-08-05', 2, 1),
('2025-08-10', '2025-08-15', 4, 0),
('2025-09-01', '2025-09-07', 3, 2);

-- Property_Reservations
INSERT INTO Property_Reservations (Property_Id, Reservation_Id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Invoices
INSERT INTO Invoices (Invoice_Date, Total_Due, Date_Paid, Guest_Id, Reservation_Id) VALUES
('2025-07-20', 600.00, '2025-07-21', 1, 1),
('2025-07-22', 1000.00, NULL, 2, 2),
('2025-07-23', 720.00, NULL, 3, 3);

COMMIT;
