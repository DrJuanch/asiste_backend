const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
    {
        instructor_name:{
            type: String
        }, 
        document:{
            type: Number
        },
        institutional_email:{
            type: String
        },
        password:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

const instructorModel = mongoose.model('Instructor', instructorSchema);

module.exports = instructorModel;

