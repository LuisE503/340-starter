-- Task 1 - SQL Statements for Assignment 2
-- Author: [Your Name]
-- Date: January 24, 2026

-- 1. Insert Tony Stark record to account table
INSERT INTO public.account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
)
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
);

-- 2. Modify Tony Stark record to change account_type to "Admin"
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 3. Delete Tony Stark record from the database
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- 4. Update "GM Hummer" record - change "small interiors" to "a huge interior"
UPDATE public.inventory
SET inv_description = REPLACE(
    inv_description,
    'small interiors',
    'a huge interior'
)
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5. Select make, model from inventory and classification name for "Sport" category using INNER JOIN
SELECT 
    inv.inv_make,
    inv.inv_model,
    cls.classification_name
FROM 
    public.inventory inv
INNER JOIN 
    public.classification cls
    ON inv.classification_id = cls.classification_id
WHERE 
    cls.classification_name = 'Sport';

-- 6. Update all records in inventory table to add "/vehicles" to file path
UPDATE public.inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
