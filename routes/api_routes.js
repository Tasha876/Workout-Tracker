// const mongojs = require("mongojs");
// const databaseUrl = "workout";
// const collections = ["workouts, exercises"];

// const db = mongojs(databaseUrl, collections);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = require("../models");

module.exports = (app) => {

  
  app.get('/api/workouts/', (req,res) => {
    // db.Workout.find({}
    db.Workout.aggregate([{
        $set: {
            totalDuration: {
                $sum: "$exercises.duration",
            }
        }
    }], (err, data) => {
        if (err) res.send(err)
        else {
            res.json(data)
            console.log(data)
        }
    })
  }),

  app.put('/api/workouts/:id', (req,res) => {
    db.Workout.findOneAndUpdate(
        { _id : new mongoose.Types.ObjectId(req.params.id)},       
        {
            $push: {
                    exercises: req.body,
            },
        }, (err, data) => {
        if (err) res.send(err)
        else {
            console.log("data",data)
            res.json(data) 
        }
    })
  });

    app.post('/api/workouts/', (req,res) => {
      db.Workout.create({
          day: new Date(),
          exercises: [],
      }, (err, data) => {
          if (err) res.send(err)
          else {
              res.json(data)
              console.log(data)
          }
      })
  });

  app.get('/api/workouts/range', (req,res) => {
    db.Workout.aggregate([{
        $set: {
            totalDuration: {
                $sum: "$exercises.duration",
            }
        }
    }]).sort({ _id: 1 })
        .limit(7)
        .then(data => res.json(data))
        .catch(err => res.json(err))
  });

  app.delete('/api/delete/:id', (req,res) => {
    db.Workout.deleteOne(
        { _id : new mongoose.Types.ObjectId(req.params.id)},
        (err, data) => {
        if (err) res.send(err)
        else {
            console.log(data)
            res.json(data) 
        }
    })
  });

}
