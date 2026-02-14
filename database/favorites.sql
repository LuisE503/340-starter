-- ****************************************************
-- This script creates the favorites table
-- for the CSE340 Final Enhancement project
-- Author: Your Name
-- Date: December 2024
-- ****************************************************

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    favorite_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    inv_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES public.account(account_id) ON DELETE CASCADE,
    FOREIGN KEY (inv_id) REFERENCES public.inventory(inv_id) ON DELETE CASCADE,
    UNIQUE(account_id, inv_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_favorites_account_id ON public.favorites(account_id);
CREATE INDEX IF NOT EXISTS idx_favorites_inv_id ON public.favorites(inv_id);

-- Add comment to table
COMMENT ON TABLE public.favorites IS 'Stores favorite vehicles for each user account';
