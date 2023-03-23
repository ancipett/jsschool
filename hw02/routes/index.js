
var express = require('express');
var router = express.Router();

const Robot = require('../models/Robot')

// Dummy data for Task 3
// router.post('/', async function(req, res) {
//   const newRobot = new Robot({name:''})
//   let nr;
//   try {
//     nr = await newRobot.save();
//   } catch (error) {
//     console.log(error)
//   }
//   res.json(nr)

// });


//POST /robot/new - create a robot with a name
router.post("/robot/new", async (req, res, next) => {
  const nameRobot = req.body.name;
  const newRobot = new Robot({name: nameRobot});
    let nr;
    try {
      nr = await newRobot.save();
    } catch (error) {
      console.log(error);
    }
    res.json(nr);
});

// Find robot by id
router.get('/robot/:id', async function(req, res) {
  const robotId = req.params.id;
    let robot;
    try {
      robot = await Robot.find({_id: robotId});
    } catch (error) {
      console.log(error);
    }
    robot ? res.json(robot) : res.sendStatus(404);
  });

//GET /robot/name - find all robots that have query (through query params) in any part of their name. Case insensitive.
// robots in database: 'ana', 'iva', 'ivAna', 'ivan', 'ivona'
// http://localhost:3000/robot/name?name=an --> 'ana', 'ivAna', 'ivan'
// http://localhost:3000/robot/name?name=N --> 'ana', 'ivAna', 'ivan', 'ivona'
// http://localhost:3000/robot/name?name=iva --> 'iva', 'ivAna', 'ivan'

router.get('/robot/name', async function(req, res) {
  const includesName = req.query.name;
  console.log(typeof includesName);
  let robot;
  try {
    robot = await Robot.find({name: new RegExp(includesName, "i") });
  } catch (error) {
    console.log(error);
  }
  res.json(robot);

});




module.exports = router;
