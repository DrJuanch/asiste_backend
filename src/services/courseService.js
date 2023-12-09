const model = require('../models/courseModel');
const { existDB } = require('../constants');

async function addCourse(course) {
    const myCourse = new model(course);
    await myCourse.save();
};

async function getCourse(filterCourse) {
    try {
        let filter = {};
        if (filterCourse !== null) {
            filter = { course_id: filterCourse };
        }

        const course = await model.find(filter)
            .populate('instructor')
            .populate('students_associated');

        return course;
    } catch (error) {
        throw new Error('Error al obtener el curso: ' + error.message);
    }
}

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

async function addApprentice(courseId, apprenticeId) {
    const foundApprentice = await model.findById(courseId);
    foundApprentice.students_associated.push(apprenticeId);
    const addApprentice = await foundApprentice.save();
    return addApprentice;
};

module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    removeCourse,
    addApprentice
};