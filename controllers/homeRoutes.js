const router = require('express').Router();
const { User, Bottle } = require('../models');
const withAuth = require('../utils/auth');


// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {
    const bottleData = await Bottle.findAll({
      where: {
          user_id: req.session.user_id
      },
      include: [
          {
              model: User,
              attributes: ['id', 'username']
          },
          {
              model: Category,
              attributes: ['id']
          }
      ]
  });

    const bottles = bottleData.map((bottle) => bottle.get({ plain: true }));

    res.render('homepage', {
      bottles,
      // TODO: Add a comment describing the functionality of this property
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
