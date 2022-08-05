const { Router } = require("express")
const axios = require("axios")
const { Dog, Temperaments } = require("../db.js")
const router = Router()


router.get("/", async (req, res) => {
    
    try {
        let temperament = await Temperaments.findAll()
        if (temperament.length === 0) {
            const api = await axios.get("https://api.thedogapi.com/v1/breeds")
            let temps = api.data.map((t) => t.temperament)

            temps = temps.join()
            temps = temps.split(",")
            temps = temps.map((e) => e.trim())
            temps.forEach( async (e) => {
                if (e.length > 0){
                    await Temperaments.findOrCreate({
                        where: {name: e}
                    })
                }
            })
            temperament = await Temperaments.findAll()
        }
        return res.json(temperament)
    } catch (e) {
        console.log(e)
    }

})

module.exports = router;