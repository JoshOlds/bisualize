const router = require('express').Router();
const Job = require('../models/job-model');

module.exports.mountPath = '/jobs'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Job.getById(req.params.id, req.query.include, function (job) {
        if(job.stack) { return next(job) }
        return res.send(job)
      })
    } else {
      Job.getAll(req.query.include, function (jobs) {
        if(jobs.stack) { return next(jobs) }
        return res.send(jobs);
      });
    }
  })

  .post(function (req, res, next) {
    Job.create(req.body, function (job) {
      if(job.stack) { return next(job) }
      return res.send(job)
    })
  })

  .put(function (req, res, next) {
      let job = req.body;
      if(job.jobId){
          Job.updateJobById(job.id, job.jobId)
      }
      if(job.jobId){
          Job.updateJobById(job.id, job.jobId)
      }
      return 
  })

  .delete(function (req, res, next) {
    Job.deleteById(req.params.id, function(response){
      if(response.stack){return next(response)}
      return res.send(response)
    })
  })
