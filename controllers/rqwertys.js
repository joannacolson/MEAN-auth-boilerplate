var express = require('express');
var Rqwerty = require('../models/rqwerty');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        Rqwerty.find(function(err, rqwertys) {
            if (err) return res.status(500).send(err);

            return res.send(rqwertys);
        });
    })
    .post(function(req, res) {
        Rqwerty.create(req.body, function(err, rqwerty) {
            if (err) return res.status(500).send(err);

            return res.send(rqwerty);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        Rqwerty.findById(req.params.id, function(err, rqwerty) {
            if (err) return res.status(500).send(err);

            return res.send(rqwerty);
        });
    })
    .put(function(req, res) {
        Rqwerty.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    })
    .delete(function(req, res) {
        Rqwerty.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    });

module.exports = router;
