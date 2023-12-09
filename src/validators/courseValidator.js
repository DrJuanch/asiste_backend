const service = require('../services/courseService');

async function addCourse(course_id, education_level, journey, instructor) {
    if (!course_id || !education_level || !journey || !instructor) {
        throw new Error('INVALID DATA');
    }

    const fullCourse = {
        course_id,
        education_level,
        journey,
        instructor
    };

    try {
        await service.addCourse(fullCourse);
        return fullCourse;
    } catch (err) {
        throw err;
    }
}

async function getCourse(filterCourse) {
    return await service.getCourse(filterCourse)
}

function updateCourse(id, course_id, education_level, journey, instructor) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("INVALID ID");
        };
        const result = service.updateCourse(id, course_id, education_level, journey, instructor);
        resolve(result);
    });
};

function deleteCourse(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            throw new Error('INVALID DATA');
        } else {
            service.removeCourse(id)
                .then((data) => {
                    if (!data) {
                        reject('Course was not found, check id or already deleted')
                    }
                    resolve()
                })
                .catch(err => {
                    reject(err);
                });
        };
    });
};

function addApprentice(course_id, apprentice_id) {
    return new Promise((resolve, reject) => {
        if (!course_id || !apprentice_id) {
            reject("INVALID ID");
        };
        const result = service.addApprentice(course_id, apprentice_id);
        resolve(result);
    });
};


module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    addApprentice
}
