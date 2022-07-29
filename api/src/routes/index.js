const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const dogs = require("./dogs")
const dog = require("./dog")
const temperaments = require("./temperaments")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogs)
router.use("/dog", dog)
router.use("/temperaments", temperaments)


module.exports = router;
