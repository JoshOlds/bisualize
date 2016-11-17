const router = require('express').Router();
const Badge = require('../models/badge-model');

module.exports.mountPath = '/badges'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Badge.getById(req.params.id, req.query.include, function (badge) {
        if (badge.stack) { return next(badge) }
        return res.send(badge)
      })
    } else {
      Badge.getAll(req.query.include, function (badges) {
        if (badges.stack) { return next(badges) }
        return res.send(badges);
      });
    }
  })

  .post(function (req, res, next) {
    let newBadge = req.body
    if(!newBadge.title || !newBadge.description){return res.send({error: 'Please provide a title and description!'})}
    Badge.create(req.body, function (badge) {
      if (badge.stack) { return next(badge) }
      return res.send(badge)
    })
  })

  .put(function (req, res, next) {
    let badge = req.body;
    if (!req.params.id) {
      return res.send({ error: 'Please provide a badge ID' });
    }
    let id = req.params.id;
    Badge.getById(id, '', data => {
      if(data.message){
        return res.send({error: `This badge does not exist: ${id}`})
      }
      if (badge.image) {
        Badge.updateImageById(id, badge.image)
      }
      if (badge.title) {
        Badge.updateTitleById(id, badge.title)
      }
      if (badge.description) {
        Badge.updateDescriptionById(id, badge.description)
      }
      res.send({message: `Badge has been updated: ${id}`})
      
    })
    
  })

  .delete(function (req, res, next) {
    Badge.deleteById(req.params.id, function (response) {
      let id = req.params.id;
      if (response.stack) { return next(response) }
      return res.send({message: `Badge Deleted: ${id}`})
    })
  })
