const mongojs = require("mongojs");
const databaseUrl = "workout";
const collections = ["workouts, exercises"];

const db = mongojs(databaseUrl, collections);

module.exports = (app) => {
  
  app.get('/api/workouts/', (req,res) => {
    db.workouts.find({}, (err, data) => {
        if (err) res.send(err)
        else {
            res.json(data)
            console.log(data)
        }
    })
  });

  app.put('/api/workouts/:id', async (req,res) => {
    console.log("put")
    console.log(req.body, req.params.id)
    db.workouts.update(
        { _id : mongojs.ObjectID(req.params.id)},
        { 
        $push: {
            exercises: req.body,
            },
        },
    db.workouts.aggregate([
        {
            $set : { 
                totalDuration :
                {
                $sum: "$exercises.duration",
                }
            }, 
        },
    ]),
    (err, data) => {
        // console.log("b",a);
        if (err) res.send(err)
        else {
            console.log("data",data)
            res.json(data) 
        }
    })
  });

    app.post('/api/workouts/', (req,res) => {
      db.workouts.insert({
          day: new Date(),
          exercises: [],
          totalDuration: 0,
      }, (err, data) => {
          if (err) res.send(err)
          else {
              res.json(data)
              console.log(data)
          }
      })
  });

  app.get('/api/workouts/range', (req,res) => {
    let day = new Date()
    day.setHours(0,0,0) // sets date to the very beginning of the day
    day.setDate(new Date().getDate() - 6) // gets one week - 1 day (i.e, 6 days) ago
    db.workouts.find({ "exercises.type" : "resistance", day: { $gt: day} }, (err, data) => {
        if (err) res.send(err)
        else {
            res.json(data)
            console.log(data)
        }
    })
  });
}