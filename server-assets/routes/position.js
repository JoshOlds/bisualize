const router = require('express').Router();
const Position = require('../models/position-model');

module.exports.mountPath = '/positions'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Position.getById(req.params.id, req.query.include, function (position) {
        if(position.stack) { return next(position) }
        return res.send(position)
      })
    } else {
      Position.getAll(req.query.include, function (positions) {
        if(positions.stack) { return next(positions) }
        return res.send(positions);
      });
    }
  })

  .post(function (req, res, next) {
    Position.create(req.body, function (position) {
      if(position.stack) { return next(position) }
      return res.send(position)
    })
  })

  .put(function (req, res, next) {
      let position = req.body;
      if(position.employeeId){
          Position.updateEmployeeById(position.id, position.employeeId)
      }
      if(position.jobId){
          Position.updateJobById(position.id, position.jobId)
      }
      return 
  })

  .delete(function (req, res, next) {
    Position.deleteById(req.params.id, function(response){
      if(response.stack){return next(response)}
      return res.send(response)
    })
  })
