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
                    return res.status(404).send(`No dog founded for id ${id}`)
                }
            }
        }
        catch(e){
            res.status(404).send(e)
        }
    }else{
        res.status(404).send(`Error , ${id}`)
    }
});

router.delete("/:id", async (req, res) => {
    let { id } = req.params
    // const dogDeleted = await Dog.find(dog => dog.id === id)
    try { 
        await Dog.destroy({
            where: {
                id,
            }
        })
        res.status(200).send("Eliminated correctly!")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;