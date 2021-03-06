const router = require('express').Router();
const Position = require('../models/position-model');
const schematron = require('../models/schematron');

module.exports.mountPath = '/positions'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Position.getById(req.params.id, req.query.include, function (position) {
        if (position.stack) { return next(position) }
        return res.send(position)
      })
    } else {
      Position.getAll(req.query.include, function (positions) {
        if (positions.stack) { return next(positions) }
        return res.send(positions);
      });
    }
  })

  .post(function (req, res, next) {
    Position.create(req.body, function (position) {
      if (position.stack) { return next(position) }
      return res.send({message: "Position has been added"})
    })
  })

  .put(function (req, res, next) {
    let position = req.body;
    let schemeArr = [];
    if (!req.params.id) {
      return res.send({ error: 'Please provide a position ID' });
    }
    let id = req.params.id;
    schemeArr.push(schematron.existsIn(id, 'position'))
    if (position.employeeId && position.employeeId != -1) { schemeArr.push(schematron.existsIn(position.employeeId, 'employee')) }
    if (position.jobId && position.jobId != -1) { schemeArr.push(schematron.existsIn(position.jobId, 'job')) }

    Promise.all(schemeArr)
      .then(() => {
        if (position.jobId) { Position.updateJobById(id, position.jobId) }
        if (position.employeeId) { Position.updateEmployeeById(id, position.employeeId) }
        res.send({ message: `Position has been updated: ${id}` })
      })

      .catch(err => {
        res.send({ error: err.toString() });
      })
  })

  .delete(function (req, res, next) {
    let id = req.params.id;
    schematron.existsIn(id, 'position').then(message => {
      Position.deleteById(req.params.id, function (response) {
        if (response.stack) { return next(response) }
        return res.send(response)
      })
    })
      .catch(err => {
        res.send({ error: err.toString() })
      })
  })
