const model = require('../models/courseModel');
const { existDB } = require('../constants');

async function addCourse(course) {
    const myCourse = new model(course);
    await myCourse.save();
};

function getCourse(filterCourse) {
    return new Promise((resolve) => {
        let filter = {};
        if (filterCourse !== null) {
            filter = { course_id: filterCourse }
        };
        const course = model.find(filter);
        resolve(course);
    });
};

async function updateCourse(id, course_id, education_level, journey, instructor) {
    const foundCourse = await model.findById(id);
    foundCourse.course_id = course_id;
    foundCourse.instructor = instructor;
    foundCourse.journey = journey;
    foundCourse.education_level = education_level

    const updateCourse = {
        course_id,
        instructor,
        journey,
        education_level
    };
    const updatedCourse = await foundCourse.save(updateCourse);
    return updatedCourse;
};

async function removeCourse(id) {
    if (await existDB(id, model)) {
        return await model.findByIdAndDelete(id)
    }
    return false;
};

async function addApprentice (id, apprenticeId) {
    const updatedCourse = await model.findByIdAndUpdate(
        id,
        {
            $push: { students_associated: apprenticeId },
        },
        { new: true }
    );

    return updatedCourse;
}

module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    removeCourse,
    addApprentice
};