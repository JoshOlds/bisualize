let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery,
  xss = require('xss');

let Job = DS.defineResource({
  name: 'job',
  endpoint: 'jobs'
})


function create(body, cb) {
  // Use the Resource Model to create a new position
  let job = {id: uuid.v4(), title: body.title, description: body.description}
  Job.create(job).then(cb).catch(cb);
}

function getAll(query, cb) {
  //Use the Resource Model to get all positions
  Job.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single position by its id
  Job.find(id, formatQuery(query)).then(cb).catch(cb)
}

// function deleteById(id, cb){

//     Position.destroy(id).then(cb).catch(cb);
//     //Cannot delete position while there are sub position attached
// }


function updateDescriptionById(id, description, cb){
    Job.update(id, {description: description}).then(cb).catch(cb)
}

function updateTitleById(id, title, cb){
    Job.update(id, {title: title}).then(cb).catch(cb)
}

// FOR TOMORROW:
// Finish up all update and delete function for position. Update exports... Then create other models, then do routes


module.exports = {
  create,
  getAll,
  getById,
  updateDescriptionById,
  updateTitleById
}

