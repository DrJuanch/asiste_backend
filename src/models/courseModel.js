const mongoose = require('mongoose');

const journeyEnum = ['diurna', 'nocturna', 'mixta'];
const educationLevelEnum = ['técnico', 'tecnólogo'];

const schema = mongoose.Schema;

const fichaSchema = new schema(
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
            type: schema.ObjectId,
            ref: 'Instructor',
            require: true
        },
        students_associated:[
            {
                type: schema.ObjectId,
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