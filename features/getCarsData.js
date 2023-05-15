const db = require('../db/connection')

async function getCarsData() {
  const carsData = await db.cars.findAll()
  let transmissionsData = await db.transmissions.findAll()
  const imagesData = await db.images.findAll()

  const finalData = carsData.map((car) => {
    let transmissions = transmissionsData
      .filter((t) => t.id_mobil === car.id_mobil)
      .flatMap((transmission) => ({
        transmission_type: transmission.transmission_type,
        speed: transmission.speed,
      }))
    let images = imagesData
      .filter((t) => t.id_mobil === car.id_mobil)
      .flatMap((img) => `${img.img_name}.${img.img_ext}`)
    return {
      ...car.toJSON(),
      transmissions,
      images,
    }
  })

  return finalData
}

module.exports = getCarsData
