const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
});

const WorkoutSchema = new Schema({

    day: {
        type: Date,
        required: true,
    },

    totalDuration: {
        type: Number,
    },

    exercises: {
        type: Schema.Types.ObjectId,
        ref: "exercise"
    }
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {
    Workout,
    Exercises,
}
