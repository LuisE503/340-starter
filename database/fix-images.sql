-- Fix image paths for vehicles that don't exist
-- This script updates the inventory table to use correct image files

UPDATE public.inventory
SET inv_image = '/images/vehicles/adventador.jpg',
    inv_thumbnail = '/images/vehicles/adventador-tn.jpg'
WHERE inv_make = 'Lamborghini' AND inv_model = 'Adventador';

UPDATE public.inventory
SET inv_image = '/images/vehicles/aerocar.jpg',
    inv_thumbnail = '/images/vehicles/aerocar-tn.jpg'
WHERE inv_make = 'Aston Martin' AND inv_model = 'Vantage';

UPDATE public.inventory
SET inv_image = '/images/vehicles/dog-car.jpg',
    inv_thumbnail = '/images/vehicles/dog-car-tn.jpg'
WHERE inv_make = 'Dodge' AND inv_model = 'Challenger';

UPDATE public.inventory
SET inv_image = '/images/vehicles/wrangler.jpg',
    inv_thumbnail = '/images/vehicles/wrangler-tn.jpg'
WHERE inv_make = 'Jeep' AND inv_model = 'Wrangler';

UPDATE public.inventory
SET inv_image = '/images/vehicles/mystery-van.jpg',
    inv_thumbnail = '/images/vehicles/mystery-van-tn.jpg'
WHERE inv_make = 'FBI' AND inv_model = 'Surveillance Van';

UPDATE public.inventory
SET inv_image = '/images/vehicles/escalade.jpg',
    inv_thumbnail = '/images/vehicles/escalade-tn.jpg'
WHERE inv_make = 'Chevy' AND inv_model = 'Suburban';

UPDATE public.inventory
SET inv_image = '/images/vehicles/hummer.jpg',
    inv_thumbnail = '/images/vehicles/hummer-tn.jpg'
WHERE inv_make = 'Chevy' AND inv_model = 'Equinox';

UPDATE public.inventory
SET inv_image = '/images/vehicles/fire-truck.jpg',
    inv_thumbnail = '/images/vehicles/fire-truck-tn.jpg'
WHERE inv_make = 'Ford' AND inv_model = 'Ranger';

UPDATE public.inventory
SET inv_image = '/images/vehicles/monster-truck.jpg',
    inv_thumbnail = '/images/vehicles/monster-truck-tn.jpg'
WHERE inv_make = 'Chevy' AND inv_model = 'Silverado';

UPDATE public.inventory
SET inv_image = '/images/vehicles/model-t.jpg',
    inv_thumbnail = '/images/vehicles/model-t-tn.jpg'
WHERE inv_make = 'Model' AND inv_model = 'Mini';

UPDATE public.inventory
SET inv_image = '/images/vehicles/crwn-vic.jpg',
    inv_thumbnail = '/images/vehicles/crwn-vic-tn.jpg'
WHERE inv_make = 'Chevy' AND inv_model = 'Impala';

UPDATE public.inventory
SET inv_image = '/images/vehicles/camaro.jpg',
    inv_thumbnail = '/images/vehicles/camaro-tn.jpg'
WHERE inv_make = 'Audi' AND inv_model = 'A4';

UPDATE public.inventory
SET inv_image = '/images/vehicles/mechanic.jpg',
    inv_thumbnail = '/images/vehicles/mechanic-tn.jpg'
WHERE inv_make = 'Ford' AND inv_model = 'Flex';

UPDATE public.inventory
SET inv_image = '/images/vehicles/batmobile.jpg',
    inv_thumbnail = '/images/vehicles/batmobile-tn.jpg'
WHERE inv_make = 'Hummer' AND inv_model = 'H2';

UPDATE public.inventory
SET inv_image = '/images/vehicles/survan.jpg',
    inv_thumbnail = '/images/vehicles/survan-tn.jpg'
WHERE inv_make = 'GMC' AND inv_model = 'Sierra';

UPDATE public.inventory
SET inv_image = '/images/vehicles/delorean.jpg',
    inv_thumbnail = '/images/vehicles/delorean-tn.jpg'
WHERE inv_make = 'BMW' AND inv_model = '3 Series';
