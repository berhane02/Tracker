const router = require('express').Router();
let bugList = require('../models/bugTacker.model');

router.route('/').get((req, res) => {
  bugList.find()
    .then(bugTacker => res.json(bugTacker))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newBug = new bugList({
    username,
    description,
    duration,
    date,
  });

  newBug.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  bugList.findById(req.params.id)
    .then(bugTacker => res.json(bugTacker))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  bugList.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  bugList.findById(req.params.id)
    .then(bugTacker => {
      bugTacker.username = req.body.username;
      bugTacker.description = req.body.description;
      bugTacker.duration = Number(req.body.duration);
      bugTacker.date = Date.parse(req.body.date);

      bugTacker.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;