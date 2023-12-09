const service = require('../services/apprenticeService');

async function addApprentice(apprentice_name,  document, document_type, last_name_apprentice, phone, gender) {
    if (!document_type || !apprentice_name || !phone || !last_name_apprentice || !gender|| !document) {
        throw new Error('INVALID DATA');
    }

    const fullApprentice = {
        apprentice_name: apprentice_name,
        document: document,
        document_type: document_type,
        last_name_apprentice: last_name_apprentice,
        phone_number: phone,
        gender: gender
    };

    try {
        await service.addApprentice(fullApprentice);
        return fullApprentice;
    } catch (err) {
        throw err;
    }
}

async function getApprentice(filterApprentice) {
    return await service.getApprentice(filterApprentice)
}

function updateApprentice(id, apprentice_name, document, document_type, last_name_apprentice, phone, gender) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("INVALID ID");
        };
        const result = service.updateApprentice(id, apprentice_name, document, document_type, last_name_apprentice, phone, gender);
        resolve(result);
    });
};

function deleteApprentice(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            throw new Error('INVALID DATA');
        } else {
            service.removeApprentice(id)
                .then((data) => {
                    if (!data) {
                        reject('Apprentice was not found, check id or already deleted')
                    }
                    resolve()
                })
                .catch(err => {
                    reject(err);
                });
        };
    });
};

function addAttendance(apprentice_id, date, attendance_state, news_report) {
    return new Promise((resolve, reject) => {
        if (!apprentice_id) {
            reject("INVALID ID");
        };

        const result = service.addAttendance(apprentice_id, date, attendance_state, news_report);
        resolve(result);
    });
};

module.exports = {
    addApprentice,
    getApprentice,
    deleteApprentice,
    updateApprentice,
    addAttendance
};
