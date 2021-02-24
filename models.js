const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
};

const ExerciseSchema = new Schema({
    type: { type: String },
    name: {
        type: String, 
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number,
});

const WorkoutSchema = new Schema({

    day: {
        type: Date,
        required: true,
    },

    exercises: [
        ExerciseSchema
    ],

    // totalDuration: Number,
    totalDuration: {
        type: Number,
        // default: 0,
        default: function () {
            return this.exercises.map( exercise => exercise.duration ).reduce((a,b) => a + b, 0)
        },
        options,
    },

    
});

const Exercises = mongoose.model("Exercises", ExerciseSchema);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {
    Workout,
    Exercises,
}
