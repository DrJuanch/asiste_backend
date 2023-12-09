const model = require('../models/instructorModel');
const { existDB } = require('../constants');

async function addInstructor(instructor) {
    const myInstructor = new model(instructor);
    await myInstructor.save();
};

function getInstructor(filterInstructor) {
    return new Promise((resolve) => {
        let filter = {};
        if (filterInstructor !== null) {
            filter = { document: filterInstructor }
        };
        const person = model.find(filter);
        resolve(person);
    });
};

async function updateInstructor(id, institutional_email, document, instructor_name, password) {
    const foundInstructor = await model.findById(id);
    foundInstructor.institutional_email = institutional_email;
    foundInstructor.document = document;
    foundInstructor.instructor_name = instructor_name;
    foundInstructor.password = password;
    const updateInstructor = {
        institutional_email,
        document,
        instructor_name,
        password
    };
    const updatedInstructor = await foundInstructor.save(updateInstructor);
    return updatedInstructor;
};

async function removeInstructor(id) {
    if (await existDB(id, model)) {
        return await model.findByIdAndDelete(id)
    }
    return false;
};

module.exports = {
    addInstructor,
    updateInstructor,
    removeInstructor,
    getInstructor
};