const mongoose = require('mongoose');

const journeyEnum = ['diurna', 'nocturna', 'mixta'];
const educationLevelEnum = ['técnico', 'tecnólogo'];

const fichaSchema = new mongoose.Schema(
    {
        course_id:{
            type:Number
        },
        education_level:{
            type:String,
            enum: educationLevelEnum
        },
        journey:{
            type:String,
            enum: journeyEnum
        },
        instructor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
            require: true
        },
        students_associated:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Apprentice',
            }
        ]
    },
    {
        timestamps:true
    }
);

const courseModel = mongoose.model('Ficha', fichaSchema);

module.exports = courseModel;