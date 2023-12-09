const service = require('../services/instructorService');
const { encrypt } = require('../helpers/handleBcrypt');
async function addInstructor(name, document, email, password) {
    if (!name || !email || !document || !password) {
        throw new Error('INVALID DATA');
    }
    const passwordHash = await encrypt(password)
    const fullInstructor = {
        instructor_name: name,
        document: document,
        institutional_email: email,
        password: passwordHash
    };

    try {
        await service.addInstructor(fullInstructor);
        return fullInstructor;
    } catch (err) {
        throw err;
    }
}

async function getInstructor(filterInstructor) {
    return await service.getInstructor(filterInstructor)
}

function updateInstructor(id, email, document, password) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("INVALID ID");
        };
        const result = service.updateInstructor(id, email, document, password);
        resolve(result);
    });
};

function deleteInstructor(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            throw new Error('INVALID DATA');
        } else {
            service.removeInstructor(id)
                .then((data) => {
                    if (!data) {
                        reject('Instructor was not found, check id or already deleted')
                    }
                    resolve()
                })
                .catch(err => {
                    reject(err);
                });
        };
    });
};

module.exports = {
    addInstructor,
    getInstructor,
    updateInstructor,
    deleteInstructor
}
