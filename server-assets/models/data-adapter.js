let uuid = require('node-uuid'),
  JsData = require('js-data'),
  fbAdapter = require('js-data-firebase'),
  DS = new JsData.DS();

let adapter = new fbAdapter({
  basePath: 'https://bisualize-82e07.firebaseio.com/'
})

DS.registerAdapter('firebase', adapter, { default: true })


function formatQuery(query){
  query = query || ''
  if(typeof query != 'string'){
    query = query.toString();
  }
  return {
    with: query.split(',').join(' ').split(' ')
  }
}

module.exports = {
  DS,
  uuid,
  formatQuery
}