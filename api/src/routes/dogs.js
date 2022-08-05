const { Router } = require("express")
const axios = require("axios")
const { Dog, Temperaments } = require("../db.js")
const router = Router()
const { Op } = require("sequelize");


router.get('/', async (req, res) =>{

    let {name} = req.query;

    if(!name){

        const breeds = await getApiDogs();
        const breedsDB = await getDbDogs();
        const allBreeds = breedsDB.concat(breeds)
        res.send(allBreeds)
        
    }else{
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`)
            var breeds = []
            apiResult.data.forEach(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    breeds.push({
                        id: e.id,
                        name: e.name,
                        image: e.image.url,
                        temperaments: e.temperament ? e.temperament : ["Not have :("],
                        weightMin: e.weight.metric.split(' - ')[0] !== "NaN" ?
                        e.weight.metric.split(' - ')[0] :
                        '30',
                        weightMax: e.weight.metric.split(' - ')[1] ?
                        e.weight.metric.split(' - ')[1] :
                        '39',
                    })
                }
            });
            if (breeds.length > 0){
                const breedsDB = await Dog.findAll({where: {name: {[Op.iLike]: name}}, include: [Temperaments]});
                if(breedsDB){
                    let allBreeds = [...breeds , ...breedsDB]
                    return res.send(allBreeds)
                }
                return res.send(breeds)

            }else {
                const breedsDB = await Dog.findAll({where: {name: {[Op.iLike]: name}}, include: [Temperaments]});
                if(breedsDB){
                    res.send(breedsDB)
                }
                else return res.status(404).send(`No results found for your search ${name}`)
            }
        }
        catch(e){
            console.log(e)
        }
    }
});

const getDbDogs = async () => {
    try {
        const dogsDb = await Dog.findAll({
            include: {
                model: Temperaments,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
        })
        return dogsDb
    }
    catch (e) {
        console.log(e)
    }
}

const getApiDogs = async () => {
    try {
        let api = await axios.get("https://api.thedogapi.com/v1/breeds")
            const dogs = api.data.map((d) => {
            return {
                id: d.id,
                name: d.name,
                image: d.image.url,
                temperaments: d.temperament ? d.temperament : "Not have :(",
                weightMin: e.weight.metric.split(' - ')[0] !== "NaN" ?
                e.weight.metric.split(' - ')[0] :
                '30',
                weightMax: e.weight.metric.split(' - ')[1] ?
                e.weight.metric.split(' - ')[1] :
                '39',
            }
        })
        return dogs
    } catch (e) {
        console.log(e)
    }
}

router.post("/", async (req, res) => {
    const {id, name, image, heightMax, heightMin, weightMin, weightMax, life_span, temperament} = req.body

    if (!name || !heightMax || !heightMin || !weightMax || !weightMin ) {
        res.status(400).send("Missing data!")
    } else {
        try {
            const dog = await Dog.create({
                image: image ? image : "https://www.pngitem.com/pimgs/m/144-1440970_black-and-white-dog-png-stock-free-dog.png",
                name: name,
                height: `${heightMin} - ${heightMax}`,
                weight: `${weightMin} - ${weightMax}`,
                weightMin: weightMin,
                weightMax: weightMax,
                life_span: life_span
            })

            if (temperament) {
                temperament.forEach(async e => {
                    const temp = await Temperaments.findOne({
                        where: {
                            name: e
                        }
                    })
                    await dog.addTemperaments(temp)
                })
            }
            res.send(dog)
            
        } catch (e) {
            console.log(e)
        }
    }

})

module.exports = router;