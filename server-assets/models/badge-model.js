let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery,
  xss = require('xss');

let Badge = DS.defineResource({
  name: 'badge',
  endpoint: 'badges'
})

function create(title, description, image, cb) {
  // Use the Resource Model to create a new position
  let badge = {id: uuid.v4(), title: title, description: description, image: image || '//placehold.it/50x50'}
  Badge.create(job).then(cb).catch(cb);
}

function getAll(query, cb) {
  //Use the Resource Model to get all positions
  Badge.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single position by its id
  Badge.find(id, formatQuery(query)).then(cb).catch(cb)
}

// function deleteById(id, cb){

//     Position.destroy(id).then(cb).catch(cb);
//     //Cannot delete position while there are sub position attached
// }


function updateDescriptionById(id, description, cb){
    Badge.update(id, {description: description}).then(cb).catch(cb)
}

function updateTitleById(id, title, cb){
    Badge.update(id, {title: title}).then(cb).catch(cb)
}

function updateImageById(id, url, cb){
    Badge.update(id, {image: url}).then(cb).catch(cb)
}

// FOR TOMORROW:
// Finish up all update and delete function for position. Update exports... Then create other models, then do routes


module.exports = {
  create,
  getAll,
  getById,
  updateDescriptionById,
  updateTitleById,
  updateImageById
}

