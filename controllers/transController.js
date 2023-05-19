const TransModel = require('../db/connection')


const createTransmision = async(req,res) => {
        const {id_transmission,id_mobil,speed} = req.body
        const transmision = await TransModel.create({
        id_transmission:id_transmission,
        id_mobil:id_mobil,
        transmission_type:'AT',
        speed:speed
    })
    res.status(200).json({
        data:transmision,
        metadata:"data transmission is create"
    })
    
}


module.exports = {
    createTransmision
}