let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery,
  xss = require('xss');

let Position = DS.defineResource({
  name: 'position',
  endpoint: 'positions',
  relations: {

    hasOne:{
        job: { //Each Position has one job
            localField: 'job',
            localKey: 'jobId'
        },
        employee: [{ //Each Position has one employee
            localField: 'employee',
            foreignKey: 'positionId' //Employee will point back to the position
        },{
            localField: 'employeeId',
            localKey: 'employeeId' //Position points to specific employee
        }],
        position: { //Each Position has one manager
            localField: "manager",
            localKey: 'managerPositionId'
        }
    },

    hasMany: {
        position:{
            localField: "reports",
            foreignKeys: "managerPositionIds"
        }
    }
  }
})


function create(managerPositionId, cb) {
  // Use the Resource Model to create a new position
  let position = {id: uuid.v4(), managerPositionId: managerPositionId}
  Position.create(position).then(cb).catch(cb);
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


function updateJobById(id, jobId, cb){
    Position.update(id, {job: jobId}).then(cb).catch(cb)
}

function updateEmployeeById(id, employeeId, cb){
    Promise.all([
        Position.update(id, {employeeId: employeeId}),
        DS.update('employee', employeeId, {positionId: id})
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

