const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const checkToken = (req, res, next) => {
  if (!req.user) res.sendStatus(403)
  else if (req.user.adminAccess) next()
  else res.sendStatus(403)
}

router.get('/', checkToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (!req.user) {
    //If you are not a logged in user, get the heck outta here.
    return
  }
  try {
    const userId = req.session.passport.user
    const user = await User.findByPk(userId)
    user.name = req.body.name
    user.email = req.body.email
    if (req.body.password) {
      user.password = req.body.password
    }
    user.address = req.body.address
    user.save()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})
