const model = require('../models/apprenticeModel');
const { existDB } = require('../constants');

async function addApprentice(apprentice) {
    const myApprentice = new model(apprentice);
    await myApprentice.save();
};

function getApprentice(filterApprentice) {
    return new Promise((resolve) => {
        let filter = {};
        if (filterApprentice !== null) {
            filter = { document: filterApprentice }
        };
        const apprentice = model.find(filter);
        resolve(apprentice);
    });
};

async function updateApprentice(id, apprentice_name, document, document_type, last_name_apprentice, phone_number, gender) {
    const foundApprentice = await model.findById(id);
    foundApprentice.apprentice_name = apprentice_name;
    foundApprentice.document = document;
    foundApprentice.document_type = document_type;
    foundApprentice.last_name_apprentice = last_name_apprentice;
    foundApprentice.phone_number = phone_number;
    foundApprentice.gender = gender;
    const updateApprentice = {
        apprentice_name,
        document,
        document_type,
        last_name_apprentice,
        phone_number,
        gender
    };
    const updatedApprentice = await foundApprentice.save(updateApprentice);
    return updatedApprentice;
};

async function removeApprentice(id) {
    if (await existDB(id, model)) {
        return await model.findByIdAndDelete(id)
    }
    return false;
};

async function addAttendance(apprenticeId, attendance) {
    const updatedApprentice = await apprenticeModel.findByIdAndUpdate(
        apprenticeId,
        {
            $push: { attendance_list: attendance },
        },
        { new: true }
    );

    return updatedApprentice;
}

module.exports = {
    addApprentice,
    getApprentice,
    removeApprentice,
    updateApprentice,
    addAttendance
};