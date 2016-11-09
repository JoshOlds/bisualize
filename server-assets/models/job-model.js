let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery,
  xss = require('xss');

let Job = DS.defineResource({
  name: 'job',
  endpoint: 'jobs'
})


function create(title, description, cb) {
  // Use the Resource Model to create a new job
  let job = {id: uuid.v4(), title: title, description: description}
  Job.create(job).then(cb).catch(cb);
}

function getAll(query, cb) {
  //Use the Resource Model to get all jobs
  Job.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single job by its id
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


module.exports = {
  create,
  getAll,
  getById,
  updateDescriptionById,
  updateTitleById
}

