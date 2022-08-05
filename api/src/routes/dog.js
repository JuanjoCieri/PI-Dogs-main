const { Router } = require("express")
const axios = require("axios")
const { Dog, Temperaments } = require("../db.js")
const router = Router()
const {Op} = require("sequelize")


router.get('/:id', async (req, res) =>{
    let {id} = req.params;
    if(id){
        try{
            const apiResult = await axios.get("https://api.thedogapi.com/v1/breeds")

            const result = apiResult.data.find(e => e.id === Number(id));
            if(result){
                return res.send({
                    id: result.id,
                    image: result.image.url,
                    name: result.name,
                    temperament: result.temperament,
                    weight: result.weight.metric,
                    height: result.height.metric,
                    life_span: result.life_span
                })
            } 
            else {
                try{
                    const result = await Dog.findOne({where: {id: id} , include: [Temperaments]})   
                    if(result){
                        return res.send({
                            id: result.id,
                            image: result.image,
                            name: result.name,
                            temperament: result.temperaments.map(e=> `${e.name}, `),
                            weight: result.weight,
                            height: result.height,
                            life_span: result.life_span
                        })
                    }
                }
                catch(e){
                    console.log(e)
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }else{
        console.log("Error")
    }
});

module.exports = router;