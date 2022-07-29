const { Router } = require("express")
const axios = require("axios")
const { Dog, Temperaments } = require("../db.js")
const router = Router()
const { Op } = require("sequelize");


// router.get("/", async (req, res) => {
//         try {
//             let api = await axios.get("https://api.thedogapi.com/v1/breeds")
//             const dogs = api.data.map((d) => {
//             return {
//                 id: d.id,
//                 name: d.name,
//                 image: d.image.url,
//                 temperaments: d.temperament,
//                 weightMin: d.weight.metric.split(' - ')[0] !== "NaN" ?
//                 d.weight.metric.split(' - ')[0] :
//                 (d.weight.metric.split(' - ')[1] ?
//                     Math.round(d.weight.metric.split(' - ')[1] * 0.6) :
//                     '30'),
//                 weightMax: d.weight.metric.split(' - ')[1] ?
//                 d.weight.metric.split(' - ')[1] :
//                 '39',
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

//         return res.json(all)
//         } catch (error) {
//             console.log(error)
//         }
//     }
// )

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
                temperaments: e.temperament,
                weightMin: e.weight.metric.split(' - ')[0] !== "NaN" ?
                e.weight.metric.split(' - ')[0] :
                (e.weight.metric.split(' - ')[1] ?
                    Math.round(e.weight.metric.split(' - ')[1] * 0.6) :
                    '30'),
                weightMax: e.weight.metric.split(' - ')[1] ?
                e.weight.metric.split(' - ')[1] :
                '39',
                    })
                }
            });
            if (breeds.length>0){
                const breedsDB = await Dog.findAll({where: {name: name}});
                if(breedsDB){
                    let allBreeds = [...breeds,...breedsDB]
                    return res.send(allBreeds)
                }
                return res.send(breeds)

            }else {
                const breedsDB = await Dog.findAll({where: {name: name}});
                if(breedsDB){
                    res.send(breedsDB)
                }
                else return res.status(404).send(`No results found four your search (${name})`)
            }
        }
        catch(e){
            console.log('Error',e)
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
                temperaments: d.temperament,
                weightMin: d.weight.metric.split(' - ')[0] !== "NaN" ?
                d.weight.metric.split(' - ')[0] :
                (d.weight.metric.split(' - ')[1] ?
                    Math.round(d.weight.metric.split(' - ')[1] * 0.6) :
                    '30'),
                weightMax: d.weight.metric.split(' - ')[1] ?
                d.weight.metric.split(' - ')[1] :
                '39',
            }
        })
        return dogs
    } catch (error) {
        console.log(error)
    }
}


// router.get("/", async (req, res) => {

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

// router.get('/', async (req, res) => {

//     let { name } = req.query;

//     try {

//         if (name) {
//             let query = await Dog.findAll({
//                 where: {
//                     name: {
//                         [Op.iLike]: `%${name}%`
//                     },
//                 },
//                 include: [Temperaments]
//             })
//             if (query.length > 0) {
//                 res.json(query);
//             } else {
//                 res.status(404).json('Not found');
//             }
//         } else {
//             let query = await Dog.findAll({
//                 include: [Temperaments]
//             });
//             res.json(query);
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// router.get("/name", async (req, res) => {
//     let {name} = req.params

//     try {
//         let dog = await Dog.findAll({
//             where: {
//                 [Op.iLike]: `%${name}%`
//             },
//             include: [Temperaments]
//         })
//         res.json(dog)
//     } catch (error) {
//         console.log(error)
//     }
// })

router.post("/", async (req, res) => {
    const {id, name, image, heightMax, heightMin, weightMin, weightMax, life_span, temperament} = req.body

    if (!name || !heightMax || !heightMin || !weightMax || !weightMin ) {
        res.status(400).send("Missing data!")
    } else {
        try {
            const dog = await Dog.create({
                image: image,
                name: name,
                height: `${heightMin} - ${heightMax}`,
                weight: `${weightMin} - ${weightMax}`,
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
            
        } catch (error) {
            console.log(error)
        }
    }

})

module.exports = router;