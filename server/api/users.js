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
