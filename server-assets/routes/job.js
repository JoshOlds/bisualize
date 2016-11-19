const router = require('express').Router(),
    Job = require('../models/job-model'),
    schematron = require('../models/schematron');

module.exports.mountPath = '/jobs'
module.exports.router = router;

router.route('/:id?')

    .get(function(req, res, next) {
        if (req.params.id) {
            Job.getById(req.params.id, req.query.include).then(function(job) {
                if (job.stack) { return next(job) }
                return res.send(job)
            })
        } else {
            Job.getAll(req.query.include, function(jobs) {
                if (jobs.stack) { return next(jobs) }
                return res.send(jobs);
            });
        }
    })

    .post(function(req, res, next) {
        let newJob = req.body;
        if(!newJob.title || !newJob.description){return res.send({error: 'Please provide a title and description!'})}
        Job.create(req.body, function(job) {
            if (job.stack) { return next(job) }
            return res.send({message: "Job has been created"})
        })
    })

    .put(function(req, res, next) {
        let job = req.body;
        if (!req.params.id) {
            return res.send({ error: 'Please provide a job ID' });
        }
        let id = req.params.id;
        Promise.all([
            schematron.existsIn(id, 'job')
        ])

            .then(() => {
                Job.getById(id).then(data => {
                    if (job.title) {
                        Job.updateTitleById(id, job.title)
                    }
                    if (job.description) {
                        Job.updateDescriptionById(id, job.description)
                    }
                    res.send({ message: `Job has been updated: ${id}` })
                })
            })

            .catch(err => {
                res.send({ error: err.toString() });
            })
    })

    .delete(function(req, res, next) {
        Job.deleteById(req.params.id, function(response) {
            let id = req.params.id;
            if (response.stack) { return next(response) }
            return res.send({ message: `Job has been deleted: ${id}` })
        })
    })
