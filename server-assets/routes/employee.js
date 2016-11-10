const router = require('express').Router();
const Employee = require('../models/employee-model');
const Job = require('../models/job-model');
const schematron = require('../models/schematron');


module.exports.mountPath = '/employees'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Employee.getById(req.params.id, req.query.include).then(function (employee) {
        if (employee.stack) { return next(employee) }
        return res.send(employee)
      })
    } else {
      Employee.getAll(req.query.include, function (employees) {
        if (employees.stack) { return next(employees) }
        return res.send(employees);
      });
    }
  })

  .post(function (req, res, next) {
    Employee.create(req.body, function (employee) {
      if (employee.stack) { return next(employee) }
      return res.send(employee)
    })
  })

  .put(function (req, res, next) {
    let employee = req.body;
    let schemeArr = [];
    if (!req.params.id) {
      return res.send({ error: 'Please provide an employee ID' });
    }
    let id = req.params.id;
    schemeArr.push(schematron.existsIn(id, 'employee'))
    if (employee.positionId) { schemeArr.push(schematron.existsIn(employee.positionId, 'position')) }
    if (employee.jobId) { schemeArr.push(schematron.existsIn(employee.jobId, 'job')) }
    if (employee.badgeId) { schemeArr.push(schematron.existsIn(employee.badgeId, 'badge')) }

    Promise.all(schemeArr)
      .then(() => {
        if (employee.jobId) { Employee.updateJobById(id, employee.jobId) }
        if (employee.positionId) { Employee.updatePositionById(id, employee.positionId) }
        if (employee.badgeId) { Employee.addBadgeById(id, employee.badgeId) }
        if (employee.image) { Employee.updateImageById(id, employee.image) }
        res.send({ message: `Employee has been updated: ${id}` })
      })

      .catch(err => {
        res.send({ error: err.toString() });
      })
  })

  .delete(function (req, res, next) {
    if (!req.params.id) {
      return res.send({ error: 'Please provide an employee ID' });
    }
    let id = req.params.id;
    schematron.existsIn(id, 'employee').then(() => {
      Employee.terminateById(id)
      res.send({ message: `Employee terminated: ${id}` })
    })
      .catch(err => {
        res.send({ error: err.toString() });
      })
  })
