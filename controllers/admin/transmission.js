const db = require('../../db/connection')

const getTransmissions = async (req, res) => {
  const carsData = await db.transmissions.findAll()
  const msg = 'success get and return all data.'
  return res.json({
    status: 200,
    message: msg,
    data: carsData,
  })
}

const getTransmission = async (req, res) => {
  const transmissionsId = req.params.id
  const carsData = await db.transmissions.findAll({
    where: { id_mobil: transmissionsId },
  })
  const partialMsg = ' get and return all data.'
  return res.json(
    carsData.length === 1
      ? {
          status: 200,
          message: 'success' + partialMsg,
          data: carsData[0],
        }
      : { status: 404, message: 'failed' + partialMsg, data: {} }
  )
}

module.exports = {
  getTransmissions,
  getTransmission,
}
