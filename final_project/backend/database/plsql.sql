-- Citation for the following file:
-- Date: 8/12/2025
-- Starter code/template code was adapted and modified from CS340 Exploration - Implementing CUD operations in your app


-- #############################
-- CREATE Invoice
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateInvoice;

DELIMITER //
CREATE PROCEDURE sp_CreateInvoice(
    IN p_invoice_date DATE, 
    IN p_total_due DECIMAL(8,2), 
    IN p_date_paid DATE, 
    IN p_guest_id INT,
    IN p_reservation_id INT,
    OUT p_id INT)
BEGIN
    INSERT INTO Invoices (Invoice_Date, Total_Due, Date_Paid, Guest_Id, Reservation_Id) 
    VALUES (p_invoice_date, p_total_due, p_date_paid, p_guest_id, p_reservation_id);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID of the last inserted invoice.
    SELECT LAST_INSERT_ID() AS 'new_id';

    -- Example of how to get the ID of the newly created invoice:
        -- CALL sp_CreateInvoice('2025-08-12', 500.00, NULL, 1, 1, @new_id);
        -- SELECT @new_id AS 'New Invoice ID';
END //
DELIMITER ;

-- #############################
-- UPDATE Invoice
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateInvoice;

DELIMITER //
CREATE PROCEDURE sp_UpdateInvoice(
    IN p_invoice_id INT, 
    IN p_invoice_date DATE, 
    IN p_total_due DECIMAL(8,2), 
    IN p_date_paid DATE, 
    IN p_guest_id INT,
    IN p_reservation_id INT)
BEGIN
    UPDATE Invoices 
    SET Invoice_Date = p_invoice_date, 
        Total_Due = p_total_due, 
        Date_Paid = p_date_paid, 
        Guest_Id = p_guest_id, 
        Reservation_Id = p_reservation_id 
    WHERE Invoice_Id = p_invoice_id;

    -- Example of how to update an invoice:
        -- CALL sp_UpdateInvoice(1, '2025-08-12', 750.00, '2025-08-13', 2, 1);
END //
DELIMITER ;

-- #############################
-- DELETE Invoice
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteInvoice;

DELIMITER //
CREATE PROCEDURE sp_DeleteInvoice( IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Invoices WHERE Invoice_Id = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Invoices for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE PropertyReservation
-- #############################
DROP PROCEDURE IF EXISTS sp_DeletePropertyReservation;

DELIMITER //
CREATE PROCEDURE sp_DeletePropertyReservation( IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Property_Reservations WHERE Property_Reservation_Id = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Invoices for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;


-- #############################
-- Refresh Database
-- #############################
-- Based on Explorations in Module 8 of CS 340
DROP PROCEDURE IF EXISTS sp_PopulateDatabase;

DELIMITER //
CREATE PROCEDURE sp_PopulateDatabase()
BEGIN

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
    Num_Of_Beds INT NOT NULL,
    Num_Of_Baths INT NOT NULL,
    Pets_Allowed BOOLEAN NOT NULL,
    Monthly_Maintenance_Cost DECIMAL(8,2) NOT NULL,
    Manager_Id INT NOT NULL,
    PRIMARY KEY (Property_Id),
    FOREIGN KEY (Manager_Id) REFERENCES Property_Managers(Manager_Id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
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
    FOREIGN KEY (Property_Id) REFERENCES Properties(Property_Id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Reservation_Id) REFERENCES Reservations(Reservation_Id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
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
    FOREIGN KEY (Guest_Id) REFERENCES Guests(Guest_Id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Reservation_Id) REFERENCES Reservations(Reservation_Id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
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
INSERT INTO Properties (Address_Line_1, Address_Line_2, City, State, Zip, Price_Per_Night, 
    Num_Of_Beds, Num_Of_Baths, Pets_Allowed, Monthly_Maintenance_Cost, Manager_Id) VALUES
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

END //
DELIMITER ;