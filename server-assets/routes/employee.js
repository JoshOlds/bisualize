const router = require('express').Router();
const Employee = require('../models/employee-model');

module.exports.mountPath = '/employees'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Employee.getById(req.params.id, req.query.include, function (employee) {
        if(employee.stack) { return next(employee) }
        return res.send(employee)
      })
    } else {
      Employee.getAll(req.query.include, function (employees) {
        if(employees.stack) { return next(employees) }
        return res.send(employees);
      });
    }
  })

  .post(function (req, res, next) {
    Employee.create(req.body, function (employee) {
      if(employee.stack) { return next(employee) }
      return res.send(employee)
    })
  })

  .put(function (req, res, next) {
      let employee = req.body;
      if(employee.employeeId){
          Employee.updateEmployeeById(employee.id, employee.employeeId)
      }
      if(employee.jobId){
          Employee.updateJobById(employee.id, employee.jobId)
      }
      return 
  })

  .delete(function (req, res, next) {
    Employee.deleteById(req.params.id, function(response){
      if(response.stack){return next(response)}
      return res.send(response)
    })
  })
