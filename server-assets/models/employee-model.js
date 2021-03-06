let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery,
    xss = require('xss');

let Employee = DS.defineResource({
    name: 'employee',
    endpoint: 'employees',
    relations: {

        hasOne: {
            job: { //Each employee has one job
                localField: 'job',
                localKey: 'jobId'
            },
            position: [{ //Each employee has one position
                localField: 'position',
                foreignKey: 'employeeId' //Employee will point back to the position
            }]
        },

        hasMany: {
            badge: {
                localField: "badges",
                localKeys: "badgeIds" //one way relationship
            }
        }
    }
})


function create(body, cb) {
    // Use the Resource Model to create a new employee
    let employee = { id: uuid.v4(), name: body.name, image: body.image || '//placehold.it/100x100', active: true, jobId: '-1', positionId: '-1' }

    Employee.create(employee).then(cb).catch(cb);
}

function getAll(query, cb) {
    //Use the Resource Model to get all employees
    Employee.findAll({}).then(cb).catch(cb)
}

function getById(id, query) {
    // use the Resource Model to get a single employee by their id
    return new Promise(function (resolve, reject) {
        Employee.find(id, formatQuery(query))
            .then(resolve)
            .catch(reject)
    })
}

// function deleteById(id, cb){

//     Position.destroy(id).then(cb).catch(cb);
//     //Cannot delete position while there are sub position attached
// }


function updateJobById(id, jobId, cb) {
    Employee.find(id).then(employee => {
        Employee.update(id, { jobId: jobId }).then(cb).catch(cb)
        if (employee.positionId != '-1') {
            DS.update('position', employee.positionId, { jobId: jobId })
        }
    })

}

function updateNameById(id, name, cb) {
    if (!name) { return cb({ error: 'Must provide a name! Cannot be blank!' }) }
    Employee.update(id, { name: name }).then(cb).catch(cb)
}

function updatePositionById(id, positionId, cb) {
    Employee.find(id).then(origEmployee => {
        if (origEmployee.positionId == positionId) {
            return cb();
        }
        DS.find('position', positionId).then(newPosition => {
            promiseArr = [
                Employee.update(id, { positionId: positionId }),
                Employee.update(id, { jobId: newPosition.jobId }),
                DS.update('position', positionId, { employeeId: id })
            ]
            if (origEmployee.positionId != '-1' && origEmployee.positionId != positionId) {
                promiseArr.push(DS.update('position', origEmployee.positionId, { employeeId: '-1' }))
            }

            Promise.all([promiseArr])
                .then(cb)
                .catch(cb)
        })
    })
}

function addBadgeById(id, badgeId, cb) {
    Employee.find(id).then(employee => {
        employee.badgeIds = employee.badgeIds || {};
        employee.badgeIds[badgeId] = badgeId;
        Employee.update(id, employee)
            .then(cb)
            .catch(cb)
    })
}

function deleteBadgeById(id, badgeId, cb) {
    Employee.find(id).then(employee => {
        if (!employee.badgeIds[badgeId]) { cb(new Error('Employee does not have the badge: ' + badgeId)) }
        delete employee.badgeIds[badgeId];
        Employee.update(id, employee)
            .then(cb)
            .catch(cb)
    })
}

function terminateById(id, cb) {
    Employee.update(id, { active: false })
        .then(cb)
        .catch(cb)
}

function updateImageById(id, url, cb) {
    if (!url) { return cb({ error: 'Must provide a url! Cannot be blank' }) }
    Employee.update(id, { image: url })
        .then(cb)
        .catch(cb)
}


module.exports = {
    create,
    getAll,
    getById,
    updateJobById,
    updatePositionById,
    updateNameById,
    addBadgeById,
    deleteBadgeById,
    terminateById,
    updateImageById
}

