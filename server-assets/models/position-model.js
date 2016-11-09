let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery,
    xss = require('xss');

let Position = DS.defineResource({
    name: 'position',
    endpoint: 'positions',
    relations: {

        hasOne: {
            job: { //Each Position has one job
                localField: 'job',
                localKey: 'jobId'
            },
            employee: [{ //Each Position has one employee
                localField: 'employee',
                foreignKey: 'positionId' //Employee will point back to the position
            }, {
                localField: 'employeeId',
                localKey: 'employeeId' //Position points to specific employee
            }],
            position: { //Each Position has one manager
                localField: "manager",
                localKey: 'managerPositionId'
            }
        },

        hasMany: {
            position: {
                localField: "reports",
                localKeys: "reportIds"
            }
        }
    }
})


function create(body, cb) {
    // Use the Resource Model to create a new position
    if (!body.managerPositionId) {
        cb(new Error('Please supply an object with managerPositionId'))
        return;
    }
    if (body.managerPositionId == -1) { //Only for master positions
        managerPositionId = body.managerPositionId;
        let position = { id: uuid.v4(), managerPositionId: body.managerPositionId, reportIds: {} }
        Position.create(position).then(cb).catch(cb);
    } else {
        let id = uuid.v4();
        Position.find(body.managerPositionId).then(position => {
            position.reportIds = position.reportIds || {};
            position.reportIds[id] = id;
            let newPosition = { id: id, managerPositionId: body.managerPositionId, reportIds: {} }
            Promise.all([
                Position.update(position.id, position),
                Position.create(newPosition)
            ])
                .then(cb).catch(cb);
        }).catch(cb)
    }
}

function getAll(query, cb) {
    //Use the Resource Model to get all positions
    Position.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    // use the Resource Model to get a single position by its id
    Position.find(id, formatQuery(query)).then(cb).catch(cb)
}

// function deleteById(id, cb){

//     Position.destroy(id).then(cb).catch(cb);
//     //Cannot delete position while there are sub position attached
// }


function updateJobById(id, jobId, cb) {
    if(jobId == -1){
        Position.update(id, {job: ''}).then(cb).catch(cb)
        return;
    }
    Position.update(id, { job: jobId }).then(cb).catch(cb)
}

function updateEmployeeById(id, employeeId, cb) {
    if (employeeId == -1) {
        Promise.all([
            Position.update(id, { employeeId: '' }),
            DS.update('employee', employeeId, { positionId: '' })
        ])
            .then(cb)
            .catch(cb)
            return;
    }
    Promise.all([
        Position.update(id, { employeeId: employeeId }),
        DS.update('employee', employeeId, { positionId: id })
    ])
        .then(cb)
        .catch(cb)
}

// FOR TOMORROW:
// Finish up all update and delete function for position. Update exports... Then create other models, then do routes


module.exports = {
    create,
    getAll,
    getById,
    updateJobById,
    updateEmployeeById
}

