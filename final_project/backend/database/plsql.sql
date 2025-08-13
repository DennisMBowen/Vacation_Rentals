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