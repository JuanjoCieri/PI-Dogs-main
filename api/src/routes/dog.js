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


// router.get("/:name", async (req, res) => {

//     let { name } = req.query

//     try {
//         if (name) {
//             let api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
//             const dogs = api.data.map((d) => {
//             return {
//                 id: d.id,
//                 name: d.name,
//                 image: d.image.url,
//                 temperaments: d.temperament,
//                 weightMin: parseInt(d.weight.imperial.split("-")[0]),
//                 weightMax: parseInt(d.weight.imperial.split("-")[1]),
//             }
//         })
//         let dogsDb = await Dog.findAll({
//             include: {
//                 model: Temperaments,
//                 attributes: ["name"],
//                 through: {
//                     attributes:[]
//                 }
//             }
//         })
//         let all = dogsDb.concat(dogs)
//         let dogBreed = await all.filter((el) =>
//         el.name.toLowerCase().includes(name.toLowerCase())
//       );
//         return res.json(dogBreed)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })

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