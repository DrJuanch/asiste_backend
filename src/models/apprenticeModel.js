const mongoose = require('mongoose');

const attendance_state_enum = ['presente', 'ausente', 'excusa'];

const attendanceSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        attendance_state: {
            type: String,
            enum: attendance_state_enum
        },
        news_report:{
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const apprenticeSchema = new mongoose.Schema(
    {
        apprentice_name:{
            type: String
        },
        document:{
            type: Number,
            require: true
        },
        document_type:{
            type: String
        },
        last_name_apprentice:{
            type: String
        },
        phone_number:{
            type: Number
        },
        gender:{
            type: String
        },
        attendance_list:[
            attendanceSchema
        ]
    },
    {
        timestamps:true
    }
);

const apprenticeModel = mongoose.model('Apprentice', apprenticeSchema);

module.exports = apprenticeModel;