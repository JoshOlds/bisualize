let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery,
  xss = require('xss');

let Badge = DS.defineResource({
  name: 'badge',
  endpoint: 'badges'
})

function create(body, cb) {
  // Use the Resource Model to create a new badge
  let badge = {id: uuid.v4(), title: body.title, description: body.description, image: body.image || '//placehold.it/50x50'}
  Badge.create(badge).then(cb).catch(cb);

}

function getAll(query, cb) {
  //Use the Resource Model to get all Badgess
  Badge.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  query = query || '';
  // use the Resource Model to get a single Badge by its id
  Badge.find(id, formatQuery(query))
  .then(cb)
  .catch(cb)
}

function deleteById(id, cb){
    Badge.destroy(id).then(cb).catch(cb);
}


function updateDescriptionById(id, description, cb){
    Badge.update(id, {description: description}).then(cb).catch(cb)
}

function updateTitleById(id, title, cb){
    Badge.update(id, {title: title}).then(cb).catch(cb)
}

function updateImageById(id, url, cb){
    Badge.update(id, {image: url}).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById,
  updateDescriptionById,
  updateTitleById,
  updateImageById,
  deleteById
}

