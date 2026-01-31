// Script to fix image paths in the database
const pool = require('./database/index');

async function fixImages() {
  try {
    const updates = [
      {
        make: 'Lamborghini',
        model: 'Adventador',
        image: '/images/vehicles/adventador.jpg',
        thumbnail: '/images/vehicles/adventador-tn.jpg'
      },
      {
        make: 'Aston Martin',
        model: 'Vantage',
        image: '/images/vehicles/aerocar.jpg',
        thumbnail: '/images/vehicles/aerocar-tn.jpg'
      },
      {
        make: 'Dodge',
        model: 'Challenger',
        image: '/images/vehicles/dog-car.jpg',
        thumbnail: '/images/vehicles/dog-car-tn.jpg'
      },
      {
        make: 'Jeep',
        model: 'Wrangler',
        image: '/images/vehicles/wrangler.jpg',
        thumbnail: '/images/vehicles/wrangler-tn.jpg'
      },
      {
        make: 'FBI',
        model: 'Surveillance Van',
        image: '/images/vehicles/mystery-van.jpg',
        thumbnail: '/images/vehicles/mystery-van-tn.jpg'
      },
      {
        make: 'Chevy',
        model: 'Suburban',
        image: '/images/vehicles/escalade.jpg',
        thumbnail: '/images/vehicles/escalade-tn.jpg'
      },
      {
        make: 'Chevy',
        model: 'Equinox',
        image: '/images/vehicles/hummer.jpg',
        thumbnail: '/images/vehicles/hummer-tn.jpg'
      },
      {
        make: 'Ford',
        model: 'Ranger',
        image: '/images/vehicles/fire-truck.jpg',
        thumbnail: '/images/vehicles/fire-truck-tn.jpg'
      },
      {
        make: 'Chevy',
        model: 'Silverado',
        image: '/images/vehicles/monster-truck.jpg',
        thumbnail: '/images/vehicles/monster-truck-tn.jpg'
      },
      {
        make: 'Model',
        model: 'Mini',
        image: '/images/vehicles/model-t.jpg',
        thumbnail: '/images/vehicles/model-t-tn.jpg'
      },
      {
        make: 'Chevy',
        model: 'Impala',
        image: '/images/vehicles/crwn-vic.jpg',
        thumbnail: '/images/vehicles/crwn-vic-tn.jpg'
      },
      {
        make: 'Audi',
        model: 'A4',
        image: '/images/vehicles/camaro.jpg',
        thumbnail: '/images/vehicles/camaro-tn.jpg'
      },
      {
        make: 'Ford',
        model: 'Flex',
        image: '/images/vehicles/mechanic.jpg',
        thumbnail: '/images/vehicles/mechanic-tn.jpg'
      },
      {
        make: 'Hummer',
        model: 'H2',
        image: '/images/vehicles/batmobile.jpg',
        thumbnail: '/images/vehicles/batmobile-tn.jpg'
      },
      {
        make: 'GMC',
        model: 'Sierra',
        image: '/images/vehicles/survan.jpg',
        thumbnail: '/images/vehicles/survan-tn.jpg'
      },
      {
        make: 'BMW',
        model: '3 Series',
        image: '/images/vehicles/delorean.jpg',
        thumbnail: '/images/vehicles/delorean-tn.jpg'
      }
    ];

    for (const update of updates) {
      const result = await pool.query(
        `UPDATE public.inventory 
        SET inv_image = $1, inv_thumbnail = $2
        WHERE inv_make = $3 AND inv_model = $4`,
        [update.image, update.thumbnail, update.make, update.model]
      );
      console.log(`Updated ${update.make} ${update.model}: ${result.rowCount} row(s)`);
    }

    console.log('All images fixed!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

fixImages();
