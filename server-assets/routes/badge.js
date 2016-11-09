const router = require('express').Router();
const Badge = require('../models/badge-model');

module.exports.mountPath = '/badges'
module.exports.router = router;

router.route('/:id?')

  .get(function (req, res, next) {
    if (req.params.id) {
      Badge.getById(req.params.id, req.query.include, function (badge) {
        if(badge.stack) { return next(badge) }
        return res.send(badge)
      })
    } else {
      Badge.getAll(req.query.include, function (badges) {
        if(badges.stack) { return next(badges) }
        return res.send(badges);
      });
    }
  })

  .post(function (req, res, next) {
    Badge.create(req.body, function (badge) {
      if(badge.stack) { return next(badge) }
      return res.send(badge)
    })
  })

  .put(function (req, res, next) {
      let badge = req.body;
      if(badge.badgeId){
          Badge.updateBadgeById(badge.id, badge.badgeId)
      }
      if(badge.badgeId){
          Badge.updateBadgeById(badge.id, badge.badgeId)
      }
      return 
  })

  .delete(function (req, res, next) {
    Badge.deleteById(req.params.id, function(response){
      if(response.stack){return next(response)}
      return res.send(response)
    })
  })
